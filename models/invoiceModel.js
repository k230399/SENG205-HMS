const mongoose = require('mongoose');
const Equipment = require('./../models/equipmentModel');
const Appointment = require('./../models/appointmentModel');

const invoiceSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now(),
    },
    status: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending',
    },
    equipment: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Equipment',
      },
    ],
    appointment: {
      type: mongoose.Schema.ObjectId,
      ref: 'Appointment',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// VIRTUAL PROPERTY
invoiceSchema.methods.calculateTotalPrice = async function () {
  const equipmentPrices = await Promise.all(
    this.equipment.map(async (id) => {
      const equipment = await Equipment.findById(id);
      return equipment.price;
    })
  );

  const totalEquipmentPrice = equipmentPrices.reduce(
    (sum, price) => sum + price,
    0
  );

  // Assuming `appointment` has a `price` field
  const appointment = await Appointment.findById(this.appointment);
  const totalPrice = appointment.price + totalEquipmentPrice;

  return totalPrice;
};

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
