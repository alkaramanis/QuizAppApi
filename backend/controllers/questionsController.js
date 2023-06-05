const factory = require('./handlerFactory')
const Questions = require('../models/questionsModel')



exports.createQuestion = factory.createOne(Questions)

