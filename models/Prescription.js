const mongoose = require('mongoose');
const Prescription = require('./Prescription');

const prescriptionSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  date: { type: Date, default: Date.now },
  medications: [String],
  diagnosis: String,
  signatureHash: String, // généré via TunTrust ou autre
  qrCodeData: String // données à encoder dans le QR Code
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
