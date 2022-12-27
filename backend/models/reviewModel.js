const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewsSchema = new mongoose.Schema(
  {
    review: String,
    rating: {
      type: Number,
      required: [true, 'You must leave a rating'],
      min: [1, 'A rating should be greater than 1'],
      max: [5, 'A rating should be higher than 5'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
reviewsSchema.index({ tour: 1, user: 1 }, { unique: true });
reviewsSchema.pre(/^find/, async function (next) {
  // this.populate({
  //   path: 'tour',
  //   select: 'name',
  // }).populate({
  //   path: 'user',
  //   select: 'name photo locations',
  // });
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});
// IN A STATIC METHOD LIKE THIS THE THIS KEYWORD POINTS TO THE CURRENT MODEL
reviewsSchema.statics.calcAverageRatings = async function (tourId) {
  console.log(tourId);
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  console.log(stats);
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};
reviewsSchema.post('save', function () {
  //this points to current review
  this.constructor.calcAverageRatings(this.tour);
});

// The only purpose of this middleware is to get access to the current doc
reviewsSchema.pre(/^findOneAnd/, async function (next) {
  //i cannot put post instead of pre because at the end of the saving of the query
  // i dont have access to the query
  this.r = await this.findOne();
  console.log(this.r);
  next();
});
reviewsSchema.post(/^findOneAnd/, async function () {
  //await this.findOne()l does not work here, query has already executed
  await this.r.constructor.calcAverageRatings(this.r.tour);
});
const Review = mongoose.model('Review', reviewsSchema);

module.exports = Review;
