const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// Middleware to access the request body
app.use(express.json());

// logger middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// ROUTES
// * aap.use() is used to mound middlewares
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// uncaught routes
app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl}  on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;
  // next(err); // if an arg in next call of ANY middleware, skip all the middleware and red the error as response

  next(new AppError(`Can't find ${req.originalUrl}  on this server`, 404)); //* if an arg in next call of ANY middleware, skip all the middleware and red the error as response
});

// error handler middleware (4 args)
app.use(globalErrorHandler);

module.exports = app;
