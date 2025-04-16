const mongoose = require('mongoose');
const Consultation = require('./Consultation');
const consultationSchema = new mongoose.Schema({
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  videoCallLink: String, // Jitsi, Zoom, etc
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Consultation', consultationSchema);
