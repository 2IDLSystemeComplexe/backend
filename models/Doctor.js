const mongoose = require('mongoose');
const User = require('./Users');

const doctorSchema = new mongoose.Schema({
  specialization: String,
  licenseNumber: String,
  phone: String,
  localisation: {
    street: { type: String, required: true },
    city: { type: String, required: true }
  },
  availability: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true
    },
    start: {
      type: String, // Format "HH:mm", ex: "09:00"
      required: true
    },
    end: {
      type: String, // Format "HH:mm", ex: "17:00"
      required: true
    }
  }], 
});

module.exports = User.discriminator('doctor', doctorSchema);
