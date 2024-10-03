const Invoice = require('./../models/invoiceModel');
const factory = require('./handlerFactory');
// const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.getInvoice = catchAsync(async (req, res, next) => {
  const invoice = await Invoice.findById(req.params.id)
    .populate('equipment')
    .populate('appointment');

  if (!invoice) {
    return next(new AppError('No invoice found with that ID', 404));
  }

  const totalPrice = await invoice.calculateTotalPrice();

  const invoiceWithTotalPrice = {
    ...invoice.toObject(), // Convert the Mongoose document to a plain object
    totalPrice, // Add the calculated totalPrice
  };

  res.status(200).json({
    status: 'success',
    data: {
      invoiceWithTotalPrice,
    },
  });
});

exports.getAllInvoice = factory.getAll(Invoice);
exports.createInvoice = factory.createOne(Invoice);
exports.updateInvoice = factory.updateOne(Invoice);
exports.deleteInvoice = factory.deleteOne(Invoice);
