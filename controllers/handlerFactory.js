const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

const getAll = Model =>
  catchAsync(async (req, res, next) => {
    // To allow nested GET reviews on tour (HACK)
    const filter = {};
    if (req.params.tourId) filter.tour = req.params.tourId;

    // Building query
    const features = new APIFeatures(Model.find(filter), req.query);
    features
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // Executing query
    const doc = await features.query;
    res
      .status(200)
      .json({ status: 'success', result: doc.length, data: { data: doc } });
  });

const getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query.populate(populateOptions);

    if (!doc) return next(new AppError('No document found with this ID.', 404));
    res.status(200).json({ status: 'success', data: { data: doc } });
  });

const createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    if (!doc) return next(new AppError());
    res.status(201).json({ status: 'success', data: { data: doc } });
  });

const updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) return next(new AppError('No document found with this ID.', 404));
    res.status(200).json({ status: 'success', data: { data: doc } });
  });

const deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) return next(new AppError('No document found with this ID.', 404));
    res.status(204).json({ status: 'success', data: null });
  });

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne
};
