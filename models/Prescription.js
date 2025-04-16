const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  consultation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consultation',
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  medications: [{
    name: { type: String, },
    dosage: { type: String,  },
    duration: { type: String, }
  }],
  issuedAt: {
    type: Date,
    default: Date.now
  },
  qrCode: String, // Chemin de l’image ou dataURL
  signature: String // hash ou chemin de signature
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
