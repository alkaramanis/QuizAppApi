const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// This is for redirecting to stripe page
exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currenttly booked tour

  const id = req.body.map((item) => item.tour.id);
  // eslint-disable-next-line arrow-body-style
  const line_items = req.body.map((item) => {
    return {
      quantity: item.quantity,
      price_data: {
        currency: 'usd',
        unit_amount: item.tour.price * 100,
        product_data: {
          name: `${item.tour.name} Tour`,
          description: item.tour.summary,
          images: [`https://www.natours.dev/img/tours/${item.tour.imageCover}`],
        },
      },
    };
  });

  // 2) Create checkout session

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.get('origin')}/dashboard?order=${JSON.stringify(
      line_items
    )}&tour=${JSON.stringify(id)}`,
    cancel_url: `${req.protocol}://${req.get('host')}`,
    customer_email: req.user.email,
    // client_reference_id: [req.params.tourId],
    mode: 'payment',
    line_items,
  });
  // 3) Create session as response

  res.status(200).json({
    status: 'success',
    session,
  });
});

// With this the user stays on my app the whole time. No redirection
exports.getPaymentIntent = catchAsync(async (req, res, next) => {
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: '2022-11-15' }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'eur',
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey:
      'pk_test_51MZX6DDVoS92akuf3I5fxCo6YdMBvnrbcMqL7gqgotqZhQyB2x2x4lxa8S5QisSPZ220y9f2Lk9tHygsnejrVUoa00jjPZMW0O',
  });
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  const { order, tour: strTour } = req.query;
  const user = req.user._id;
  const parsedOrder = JSON.parse(order);
  const tour = JSON.parse(strTour);

  let price = 0;
  parsedOrder.forEach(
    (obj) => (price = price + obj.price_data.unit_amount * obj.quantity)
  );
  if (!parsedOrder && !user) return next();
  const booking = await Booking.create({ tour, user, price });

  res.status(200).json({
    status: 'success',
    booking,
  });
});
exports.setQueryParamUser = catchAsync(async (req, res, next) => {
  if (
    req.originalUrl.includes('getMyBookings') ||
    req.originalUrl.includes('checkIfVisited')
  )
    req.query = { user: req.user.id };
  // req.guery.user = req.user.name;
  next();
});
exports.getAllBookings = factory.getAll(Booking);
