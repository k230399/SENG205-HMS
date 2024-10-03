const Equipment = require('./../models/equipmentModel');
const factory = require('./handlerFactory');
// const AppError = require('../utils/appError');
// const catchAsync = require('./../utils/catchAsync');

exports.getAllEquipment = factory.getAll(Equipment);
exports.getEquipment = factory.getOne(Equipment);
exports.createEquipment = factory.createOne(Equipment);
exports.updateEquipment = factory.updateOne(Equipment);
exports.deleteEquipment = factory.deleteOne(Equipment);
