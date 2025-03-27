/**
 * A higher order utility function to handle asynchronous route handlers and middleware.
 * This function wraps an asynchronous function and ensures that any errors
 * occurring within the function are passed to the `next()` function, which
 * triggers the global error-handling middleware.
 *
 * @function catchAsync
 * @param {Function} fn - The asynchronous function to be wrapped. It should
 *                        follow the standard Express middleware signature:
 *                        (req, res, next).
 * @returns {Function} - A new function that executes the provided async
 *                       function and catches any errors, passing them to `next()`.
 *
 * @example
 * const getAllTours = catchAsync(async (req, res, next) => {
 *   const tours = await Tour.find();
 *   res.status(200).json({ status: 'success', data: { tours } });
 * });
 *
 * app.get('/api/v1/tours', getAllTours);
 */
const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
module.exports = catchAsync;
