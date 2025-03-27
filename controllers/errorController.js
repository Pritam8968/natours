const AppError = require('../utils/appError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;

  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
  const message = `Duplicate field value: ${err.keyValue.name}. Please use another value`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
  const message = `Invalid input data. ${err.message}.`;

  return new AppError(message, 400);
};

const sendErrorDev = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack
  });

const sendErrorProd = (err, res) => {
  // Operational/trusted errors: send the message to client
  if (err.isOperational)
    res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });
  // in case of Programming or other unknown error, don't leak the error
  else {
    console.error('ERROR 💥:', err);
    res.status(500).json({ status: 'error', message: 'Something went wrong.' });
  }
};

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') sendErrorDev(err, res);
  else if (process.env.NODE_ENV === 'production') {
    // let error = structuredClone(err);
    let error = JSON.parse(JSON.stringify(err));
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};
module.exports = errorHandler;
