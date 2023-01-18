const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');
const catchAsync = require('../utils/catchAsync');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
const createSendToken = function (user, statusCode, res) {
  const token = signToken(user._id);
  const cookieOpt = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),

    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOpt.secure = true;
  res.cookie('jwt', token, cookieOpt);

  //REMOVE THE PASSWORD FROR THE OUTPUT
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  createSendToken(newUser, 201, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  const token = '';
  const cookieOpt = {
    expires: new Date(Date.now()),
    httpOnly: true,
  };
  res.cookie('jwt', token, cookieOpt);
  res.status(201).json({
    status: 'success',
    token,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  //2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  //HAVING THE CONDITION LIKE THIS THE HACKER DOESNT KNOW WHATS WRONG THE PASS OR EMAIL
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  //3)if everything ok, sent token to clent

  createSendToken(user, 201, res);
});
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if exists

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token)
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token does no longer exist', 401)
    );
  }

  //4) Check if user changed password after the token was issued
  if (currentUser.changePasswordAfter(decoded.iat))
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  // GRAND ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});
// eslint-disable-next-line arrow-body-style
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError('You dont have permission to perform this action', 403)
      );
    next();
  };
};
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) GET USER BASED ON POSTED EMAIL
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return next(new AppError('There is no user with that email address.'), 404);
  // 2)GENERATE THE RANDOM RESET TOKEN
  const resetToken = user.changePasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //3) SEND IT TO THE USER's email

  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}}`;

  const message = `Forgot your password? Submit a PATCH request with your new password passwordConfrim to :${resetURL}.\nIf you didn't forget your password please ignore this email!`;
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordRestExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        'There was an error sennding the email.Try again later!',
        500
      )
    );
  }
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  // 2) if token has not expired, and there is user, set the new password
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) return next(new AppError('Wrong token or token has expired', 400));
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  // 3 Update changePasswordAt property for the user

  await user.save();
  // 4) log the user in, send JWT
  createSendToken(user, 200, res);
});
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from the collection
  const user = await User.findById(req.user.id).select('+password');
  // 2) check if posted current password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password)))
    return new AppError('Your current password is wrong', 401);
  // 3) if so, update password
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPasswordConfirm;

  await user.save();
  // 4) log user in, send JWT
  createSendToken(user, 200, res);
});
