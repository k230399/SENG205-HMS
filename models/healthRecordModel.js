const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now(),
    },
    patient: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    dateOfBirth: Date,
    gender: String,
    bloodType: String,
    allergies: {
      type: [String],
    },
    cronicConditions: {
      type: [String],
    },
    currentMedication: {
      type: [String],
    },
    doctor: String,
    lastVisit: Date,
    notes: {
      type: [String],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Populate references
healthRecordSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'patient',
    select: '-__v -passwordChangedAt',
  });
  next();
});

const HealthRecord = mongoose.model('HealthRecord', healthRecordSchema);

module.exports = HealthRecord;
