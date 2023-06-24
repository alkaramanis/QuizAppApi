const express = require('express');
const questionsController = require('../controllers/questionsController');

const router = express.Router();

router.post('/', questionsController.createQuestion);
module.exports = router;
