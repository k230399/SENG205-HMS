const express = require('express');
const invoiceController = require('./../controllers/invoiceController');
const authController = require('./../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router
  .route('/')
  .get(authController.restrictTo('admin'), invoiceController.getAllInvoice)
  .post(authController.restrictTo('admin'), invoiceController.createInvoice);

router
  .route('/:id')
  .get(invoiceController.getInvoice)
  .patch(authController.restrictTo('admin'), invoiceController.updateInvoice)
  .delete(authController.restrictTo('admin'), invoiceController.deleteInvoice);

module.exports = router;
