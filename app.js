const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const appointmentRouter = require('./routes/appointmentRoutes');
const userRouter = require('./routes/userRoutes');
const healthRecordRouter = require('./routes/healthRecordRoutes');
const equipmentRouter = require('./routes/equipmentRoutes');
const invoiceRouter = require('./routes/invoiceRoutes');

const app = express();

// 1) GLOBAL MIDDLEWARES
// Set security HTTP Headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from boy into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['department', 'date', 'time', 'status'],
  })
);

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Test middlewear
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(compression());

// 3) ROUTES
app.use('/api/v1/appointments', appointmentRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/health-records', healthRecordRouter);
app.use('/api/v1/equipment', equipmentRouter);
app.use('/api/v1/invoices', invoiceRouter);

// Unhandled Routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
