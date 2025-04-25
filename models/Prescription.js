const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment', 
    required: true
  },
  medications: [{
    name: { type: String, },
    dosage: { type: String,  },
    frequency: { type : String},
    duration: { type: String, }
  }],
  issuedAt: {
    type: Date,
    default: Date.now
  },
  qrCode: String, // Chemin de l’image ou dataURL
  
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
