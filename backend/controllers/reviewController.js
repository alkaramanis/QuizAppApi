const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');
//const catchAsync = require('../utils/catchAsync');

exports.setTourUserIds = (req, res, next) => {
  // ALLOW NESTED ROUTES
  //------the code was in createReview was here but i made it a middleware
  //function to allow the factory refactoring
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};
exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
