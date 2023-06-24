const mongoose = require('mongoose');

const weeklyInfoSchema = new mongoose.Schema({
  legendsGonnaGetPaid: Number,
  currentLegends: {
    type: Number,
    default: 0,
  },
  legendsId: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      default: [],
    },
  ],
  current: {
    type: Boolean,
    default: true,
  },
});

const WeeklyInfo = mongoose.model('weeklyinfo', weeklyInfoSchema);

module.exports = WeeklyInfo;
