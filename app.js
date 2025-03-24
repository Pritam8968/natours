const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Middleware to access the request body
app.use(express.json());

// test middleware
app.use((req, res, next) => {
  console.log('Hello from test middleware 👋');
  next(); //* VVI else req-res cycle will be stuck
});

// logger middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Routes
/* app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTourById);
app.post('/api/v1/tours', createTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTourById)
  .patch(updateTour)
  .delete(deleteTour);
  */

// * aap.use() is used to mound middlewares
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
