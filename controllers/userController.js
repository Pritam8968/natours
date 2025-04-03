const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

const filterObj = (obj, allowedFields) => {
  const result = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) result[el] = obj[el];
  });
  return result;
};

// Handlers
const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        'Please use /update-my-password to change your password.',
        400
      )
    );

  // 2) Filtered out unwanted fields
  const allowedFields = ['name', 'email'];
  const filteredBody = filterObj(req.body, allowedFields);
  // as we are not dealing with sensitive info so can use findByIdAndUpdate
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ status: 'success', data: { user: updatedUser } });
});

const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({ status: 'success', data: null });
});

const createUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'This route is not defined. Please use /signup instead.'
  });
};

const getAllUsers = factory.getAll(User);

const getUser = factory.getOne(User);

// DO NOT UPDATE PASSWORDS WITH THIS
const updateUser = factory.updateOne(User);

const deleteUser = factory.deleteOne(User);

const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe
};
