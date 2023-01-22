const express = require('express');

const userController = require('../controllers/userController');

const authController = require('../controllers/authController');

const router = express.Router();

//---------------ALL ABOUT AUTH ROUTES
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

//This is to protect all the routes from this point
router.use(authController.protect);

router.patch('/updateMypassword', authController.updatePassword);
//-------------- ALL ABOUT PERSONAL PROFILE UPDATES

router.get(
  '/me',
  authController.protect,
  userController.getMe,
  userController.getUser
);
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.reziseUserPhoto,
  userController.updateMe
);
router.delete('/deleteMe', userController.deleteMe);

//---------------- ALL ABOUT INTERACTING WITH USERS
//// 2) ROUTE HANDLERS
//ONLY FOR ADMINS
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
