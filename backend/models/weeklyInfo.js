const mongoose = require('mongoose');

const weeklyInfoSchema = new mongoose.Schema({
    legendsGonnaGetPaid: Number,
    currentLegends: Number,
    legendsId:[
        {
          type: mongoose.Schema.ObjectId,
          ref: 'User',  
        },
      ],
    current: {
        type: Boolean,
        default: true
    }  
})

const WeeklyInfo = mongoose.model(' WeeklyInfo' , weeklyInfoSchema)

module.exports =  WeeklyInfo;