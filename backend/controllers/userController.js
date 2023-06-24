const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const WeeklyInfo = require('../models/weeklyInfo');
const notification = require('../utils/notifications');

// THIS IS THE STEPS TO CONFIGURE MULTER

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, '../frontend/src/assets/img/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadUserPhoto = upload.single('photo');

exports.reziseUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`../frontend/src/assets/img/users/${req.file.filename}`);

  next();
});
// ----- SOS THIS METHOD IS FOR FILTERING THE REQ BODY WITH ONLY THE FIELDS THAT WE SHOULD UPGRADE
const filterObj = (obj, ...params) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (params.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user posts password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use / updateMyPassword',
        404
      )
    );
  }
  // 2) filtering unwanted field names that we dont want to be updated

  const filteredBody = filterObj(
    req.body,
    'name',
    'email',
    'rank',
    'avatar',
    'exponentPushToken'
  );

  if (req.body.rank === 0) {
    const weekToBeUpdate = await WeeklyInfo.findOne({ current: true });
    console.log(weekToBeUpdate);

    if (weekToBeUpdate) {
      weekToBeUpdate.legendsId.push(req.user.id);
      weekToBeUpdate.currentLegends += 1;
      await weekToBeUpdate.save();

      notification.sendPushNotification(weekToBeUpdate);
    }
  }
  if (req.file) filteredBody.photo = req.file.filename;
  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use/signup instead ',
  });
};
//Do NOT update password with this

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
