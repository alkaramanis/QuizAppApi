const factory = require('./handlerFactory');
const Avatars = require('../models/avatarModel');

exports.getAllAvatars = factory.getAll(Avatars);
exports.createAvatar = factory.createMany(Avatars);
