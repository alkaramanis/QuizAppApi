const express = require('express');
const avatarsController = require('../controllers/avatarsController');

const router = express.Router();

router.post('/', avatarsController.createAvatar);
router.get('/', avatarsController.getAllAvatars);
module.exports = router;
