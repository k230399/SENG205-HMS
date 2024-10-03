const HealthRecord = require('./../models/healthRecordModel');
const factory = require('./handlerFactory');
// const AppError = require('../utils/appError');
// const catchAsync = require('./../utils/catchAsync');

exports.setUserIds = (req, res, next) => {
  if (!req.body.patient) req.body.patient = req.user.id;
  next();
};

exports.getAllHealthRecord = factory.getAll(HealthRecord);
exports.getHealthRecord = factory.getOne(HealthRecord);
exports.createHealthRecord = factory.createOne(HealthRecord);
exports.updateHealthRecord = factory.updateOne(HealthRecord);
exports.deleteHealthRecord = factory.deleteOne(HealthRecord);
