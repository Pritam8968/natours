const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const sanitizeInput = require('./utils/sanitize');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

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
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"]
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

// Mounting tour-related routes
app.use('/api/v1/tours', tourRouter);

// Mounting user-related routes
app.use('/api/v1/users', userRouter);

// Mounting review-related routes
app.use('/api/v1/reviews', reviewRouter);

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
