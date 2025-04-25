const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: Object,
    required: true,
  },
  patient: {
    type: Object,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String, // Example: "14:30"
    required: true,
  },
  mode: {
    type: String,
    enum: ['en ligne', 'en cabinet'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  videoCallLink :{
    type:String,
    default:'https://meet.jit.si/consultation-'
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
