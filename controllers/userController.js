const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

//save in disk
// const multerStorage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, 'public/img/users');
//   },
//   filename: function(req, file, cb) {
//     const extension = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${extension}`);
//   }
// });

//save in memory buffer
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // accept
  if (file.mimetype.startsWith('image')) cb(null, true);
  //reject
  else cb(new AppError('Not an image! Please upload only images.', 400), false);
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

const uploadUserPhoto = upload.single('photo');

const resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);
  next();
});

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
  if (req.file) filteredBody.photo = req.file.filename;
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
  getMe,
  uploadUserPhoto,
  resizeUserPhoto
};
