const express = require('express');
const viewsContoller = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewsContoller.getSignupView);

router.get('/createQuestion', viewsContoller.getCreateQuestionView);
module.exports = router;
