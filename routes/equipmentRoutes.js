const express = require('express');
const equipmentController = require('./../controllers/equipmentController');
const authController = require('./../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router
  .route('/')
  .get(equipmentController.getAllEquipment)
  .post(
    authController.restrictTo('admin'),
    equipmentController.createEquipment
  );

router
  .route('/:id')
  .get(equipmentController.getEquipment)
  .patch(
    authController.restrictTo('admin'),
    equipmentController.updateEquipment
  )
  .delete(
    authController.restrictTo('admin'),
    equipmentController.deleteEquipment
  );

module.exports = router;
