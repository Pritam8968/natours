const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');

const getOverview = catchAsync(async (req, res, next) => {
  // Get tour data ftom collection
  const tours = await Tour.find();

  res.status(200).render('overview', { title: 'All Tours', tours });
});

const getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });
  if (!tour)
    return next(new AppError('The requested tour could not be found', 404));
  res.status(200).render('tour', { title: `${tour.name} Tour`, tour });
});

const getLoginForm = (req, res) => {
  res.status(200).render('login', { title: 'Log into your account' });
};

const getAccount = (req, res) => {
  res.status(200).render('account', { title: 'Your account' });
};

const updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    { new: true, runValidators: true }
  );
  res
    .status(200)
    .render('account', { title: 'Your account', user: updatedUser });
});

const getMyTours = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id });

  const tourIds = bookings.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIds } });
  res.status(200).render('overview', { title: 'My Tours', tours });
});

module.exports = {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
  updateUserData,
  getMyTours
};
