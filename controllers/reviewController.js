const Review = require('../models/reviewModel');
// const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

const setTourAndUserIds = (req, res, next) => {
  req.body.tour = req.body.tour || req.params.tourId;
  req.body.user = req.body.user || req.user.id;
  next();
};

const getAllReviews = factory.getAll(Review);

const getReview = factory.getOne(Review);

const createReview = factory.createOne(Review);

const updateReview = factory.updateOne(Review);

const deleteReview = factory.deleteOne(Review);

module.exports = {
  getAllReviews,
  getReview,
  setTourAndUserIds,
  createReview,
  updateReview,
  deleteReview
};
