const mongoose = require('mongoose');
// const User = require('./userModel');
// const slugify = require('slugify');
// const validator = require('validator');

const appointmentSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, 'An appointment must have a date'],
    },
    time: {
      type: String,
      enum: {
        values: ['Morning', 'Noon', 'Afteroon', 'Late Afternoon'],
        message: 'Time should be: Morning, Noon, Afternoon, and Late Afternoon',
      },
    },
    medicalIssue: {
      type: String,
      trim: true,
    },
    department: String,
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Refunded', 'Cancelled'],
      default: 'Pending',
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      //select: false, //remove from select() method
    },
    patient: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    doctor: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    procedure: String,
    price: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// USE THIS IF EMBEDDING A USER
// appointmentSchema.pre('save', async function (next) {
//   const patientPromises = this.patient.map(
//     async (id) => await User.findById(id)
//   );
//   this.patient = await Promise.all(patientPromises);
//   next();
// });

// QUERY MIDDLEWARE

// Populate references
appointmentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'patient doctor',
    select: '-__v -passwordChangedAt',
  });
  next();
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
