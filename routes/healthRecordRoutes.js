const express = require('express');
const healthRecordController = require('./../controllers/healthRecordController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

// Protect all routes after this middleware
router.use(authController.protect);

router
  .route('/')
  .get(healthRecordController.getAllHealthRecord)
  .post(
    healthRecordController.setUserIds,
    healthRecordController.createHealthRecord
  );

router
  .route('/:id')
  .get(healthRecordController.getHealthRecord)
  .patch(healthRecordController.updateHealthRecord)
  .delete(
    authController.restrictTo('patient', 'admin'),
    healthRecordController.deleteHealthRecord
  );

module.exports = router;
