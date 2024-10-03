const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'An equipment must have a name'],
    },
    price: {
      type: Number,
      required: [true, 'An equipment must have a price'],
      default: '0',
    },
    quanitiy: {
      type: Number,
      default: 0,
    },
    invoice: {
      type: mongoose.Schema.ObjectId,
      ref: 'Invoice',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;
