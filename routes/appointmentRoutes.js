const express = require('express');
const apppointmentController = require('./../controllers/appointmentController');
const authController = require('./../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router
  .route('/')
  .get(apppointmentController.getAllAppointments)
  .post(
    apppointmentController.setUserIds,
    apppointmentController.createAppointment
  );

router
  .route('/:id')
  .get(apppointmentController.getAppointment)
  .patch(apppointmentController.updateAppointment)
  .delete(
    authController.restrictTo('admin'),
    apppointmentController.deleteAppointment
  );

module.exports = router;
