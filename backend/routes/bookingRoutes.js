const express = require('express');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();
router.post(
  '/checkout-session',
  authController.protect,
  bookingController.getCheckoutSession
);
router.get(
  '/create-booking',
  authController.protect,
  bookingController.createBookingCheckout
);
router.get(
  '/getMyBookings',
  authController.protect,
  bookingController.getMyTours,
  bookingController.getAllBookings
);
router.get('/', bookingController.getAllBookings);
module.exports = router;
