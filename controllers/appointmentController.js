const Appointment = require('./../models/appointmentModel');
const factory = require('./handlerFactory');
// const AppError = require('../utils/appError');
// const catchAsync = require('./../utils/catchAsync');

// Aliasing
// exports.aliasName = (req, res, next) => {
//   req.query.limit = '';
//   req.query.sort = '';
//   req.query.fields = '';
//   next();
// };

exports.setUserIds = (req, res, next) => {
  if (!req.body.patient) req.body.patient = req.user.id;
  next();
};

exports.getAllAppointments = factory.getAll(Appointment);
exports.getAppointment = factory.getOne(Appointment); // (Appointment, {path: 'reviews'})
exports.createAppointment = factory.createOne(Appointment);
exports.updateAppointment = factory.updateOne(Appointment);
exports.deleteAppointment = factory.deleteOne(Appointment);
