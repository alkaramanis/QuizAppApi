const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitise = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const avatarRouter = require('./routes/avatarsRoute');
const app = express();
const cors = require('cors');
const globalErrorHandler = require('./controllers/errorController');
const bookingRouter = require('./routes/bookingRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const questionsRouter = require('./routes/questionsRoutes');
const viewsRouter = require('./routes/viewsRoutes');
const bookingController = require('./controllers/bookingController');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// app.use(cors());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

//1) GLOBAL MIDDLEWEARS
// Set security hhtp
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'", 'data:', 'blob:'],

//       baseUri: ["'self'"],

//       fontSrc: ["'self'", 'https:', 'data:'],

//       scriptSrc: ["'self'", 'https://*.cloudflare.com'],

//       scriptSrc: ["'self'", 'https://*.stripe.com'],

//       scriptSrc: ["'self'", 'http:', 'https://*.mapbox.com', 'data:'],

//       frameSrc: ["'self'", 'https://*.stripe.com'],

//       objectSrc: ["'none'"],

//       styleSrc: ["'self'", 'https:', 'unsafe-inline'],

//       workerSrc: ["'self'", 'data:', 'blob:'],
//       childSrc: ["'self'", 'blob:'],

//       imgSrc: ["'self'", 'data:', 'blob:'],

//       connectSrc: ["'self'", 'blob:', 'https://*.mapbox.com'],

//       upgradeInsecureRequests: [],
//     },
//   })
// );

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit request from the same API
const limiter = rateLimit({
  // accept max 100 req per hour for this ip

  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP,plaease try again in an hour!',
});
app.use('/api', limiter);

//Body parser, reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
//Data sanitization against NoSQL query injection
app.use(mongoSanitise());

// Data sanitization agaainst XSS
app.use(xss());

//prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

//Serving static files

app.use(express.static(`${__dirname}/public`));

//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});
//2) ROUTES
app.use('/', viewsRouter);
app.get('/:id', (req, res) => {
  res.sendFile(__dirname + `/public/${req.params.id}`);
});
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/avatars', avatarRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/booking', bookingRouter);
app.use('/api/v1/questions', questionsRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
