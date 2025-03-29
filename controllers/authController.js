const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

/*  
  ───────────────────────────────────────
  JWT TOKEN HANDLING FUNCTIONS
  ───────────────────────────────────────
*/

// Function to generate a JWT token for a user
const generateToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

// Function to send JWT as a cookie and response
const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);

  // Cookie options
  const cookieOptions = {
    maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000, // Convert days to milliseconds
    httpOnly: true // Prevent access via JavaScript (security)
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from response object
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user }
  });
};

/*  
  ───────────────────────────────────────
  AUTHENTICATION CONTROLLERS
  ───────────────────────────────────────
*/

// User Signup
const signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  const newUser = await User.create({ name, email, password, passwordConfirm });

  sendTokenResponse(newUser, 201, res);
});

// User Login
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Ensure email and password are provided
  if (!email || !password)
    return next(new AppError('Email and password are required.', 400));

  // 2) Validate user credentials
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.checkPassword(password, user.password)))
    return next(new AppError('Incorrect email or password', 401));

  // 3) If credentials are correct, send token
  sendTokenResponse(user, 200, res);
});

/*  
  ───────────────────────────────────────
  AUTHORIZATION & PROTECTION MIDDLEWARES
  ───────────────────────────────────────
*/

// Protect routes (requires authentication)
const protect = catchAsync(async (req, res, next) => {
  // 1) Get the token from headers
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
    token = req.headers.authorization.split(' ')[1];

  if (!token)
    return next(
      new AppError('You are not logged in. Please log in to get access.', 401)
    );

  // 2) Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    return next(
      new AppError('The user associated with this token no longer exists.', 401)
    );

  // 4) Check if user changed password after issuing token
  if (currentUser.checkIfPasswordRecentlyChanged(decoded.iat))
    return next(
      new AppError(
        'The user has recently changed their password. Please log in again.',
        401
      )
    );

  // 5) Grant access to protected route
  req.user = currentUser;
  next();
});

// Restrict route access to specific roles
const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role))
      return next(
        new AppError('You do not have permission to perform this action.', 403)
      );

    next();
  };
};

/*  
  ───────────────────────────────────────
  PASSWORD RESET FUNCTIONALITY
  ───────────────────────────────────────
*/

// Forgot Password (send reset token to email)
const forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Find user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(new AppError('No user found with that email address.', 404));

  // 2) Generate random reset token
  const resetToken = user.generatePasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send token to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/reset-password/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your Password Reset Token (Valid for 10 Minutes)',
      message
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500
      )
    );
  }

  res.status(200).json({
    status: 'success',
    message: 'Token sent to email address'
  });
});

// Reset Password (use token to set a new password)
const resetPassword = catchAsync(async (req, res, next) => {
  // 1) Hash the token and find the user
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpiresIn: { $gt: Date.now() }
  });

  if (!user)
    return next(
      new AppError('Token is invalid or has expired. Please try again.', 400)
    );

  // 2) Update password and remove reset token
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpiresIn = undefined;

  await user.save();

  // 3) Log the user in
  sendTokenResponse(user, 200, res);
});

// Update Password (while logged in)
const updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get the currently logged-in user
  const user = await User.findById(req.user.id).select('+password');

  // 2) Verify old password
  if (!(await user.checkPassword(req.body.passwordCurrent, user.password)))
    return next(new AppError('The current password is incorrect', 401));

  // 3) Update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4) Send new token
  sendTokenResponse(user, 200, res);
});

/*  
  ───────────────────────────────────────
  EXPORTING CONTROLLERS
  ───────────────────────────────────────
*/

module.exports = {
  signup,
  login,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
  updatePassword
};
