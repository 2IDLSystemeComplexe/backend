const mongoose = require('mongoose');
const User = require('./Users');

const patientSchema = new mongoose.Schema({
  medicalHistory: String,
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  }]
});

module.exports = User.discriminator('patient', patientSchema);
