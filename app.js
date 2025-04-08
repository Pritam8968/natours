const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const sanitizeInput = require('./utils/sanitize');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const viewRouter = require('./routes/viewRoutes');
const bookingRouter = require('./routes/bookingRoutes');

const app = express();
app.use(cookieParser());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, 'public')));

/*  
  ───────────────────────────────────────
  SECURITY MIDDLEWARES
  ───────────────────────────────────────
*/

// Set security-related HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          'https://api.mapbox.com',
          'https://events.mapbox.com',
          'https://js.stripe.com',
          'blob:'
        ],
        workerSrc: ["'self'", 'blob:'],
        styleSrc: [
          "'self'",
          'https://fonts.googleapis.com',
          'https://api.mapbox.com',
          "'unsafe-inline'" // sometimes needed for Stripe and Google Fonts
        ],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: [
          "'self'",
          'data:',
          'https://api.mapbox.com',
          'https://q.stripe.com'
        ],
        connectSrc: [
          "'self'",
          'https://api.mapbox.com',
          'https://events.mapbox.com',
          'https://api.stripe.com',
          'https://js.stripe.com',
          'https://q.stripe.com'
        ],
        frameSrc: ['https://js.stripe.com'], // needed for Stripe checkout or elements
        objectSrc: ["'none'"] // for extra security
      }
    }
  })
);

// Rate limiting to prevent brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per window
  standardHeaders: true, // Show rate limit info in headers
  legacyHeaders: false, // Disable old X-RateLimit-* headers
  message: { error: 'Too many requests, please try again in 15 minutes.' }
});
app.use('/api', limiter);

/*  
  ───────────────────────────────────────
  BODY PARSING & SANITIZATION MIDDLEWARES
  ───────────────────────────────────────
*/

// Middleware to parse incoming JSON requests
app.use(express.json({ limit: '10kb' })); // Prevents large payload attacks
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Prevents NoSQL injection attacks by sanitizing user input
app.use(mongoSanitize());

// Prevents XSS (Cross-site Scripting) attacks by sanitizing request input
app.use(sanitizeInput);

// Prevents HTTP Parameter Pollution (HPP)
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

// Response compression
app.use(compression());

/*  
  ───────────────────────────────────────
  DEVELOPMENT LOGGING MIDDLEWARE
  ───────────────────────────────────────
*/

// Logs HTTP requests to the console in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/*  
  ───────────────────────────────────────
  ROUTES
  ───────────────────────────────────────
*/

app.use('/', viewRouter);

// Mounting tour-related routes
app.use('/api/v1/tours', tourRouter);

// Mounting user-related routes
app.use('/api/v1/users', userRouter);

// Mounting review-related routes
app.use('/api/v1/reviews', reviewRouter);

// Mounting booking-related routes
app.use('/api/v1/bookings', bookingRouter);

/*  
  ───────────────────────────────────────
  HANDLING UNHANDLED ROUTES
  ───────────────────────────────────────
*/

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

/*  
  ───────────────────────────────────────
  GLOBAL ERROR HANDLING MIDDLEWARE
  ───────────────────────────────────────
*/

app.use(globalErrorHandler);

module.exports = app;
