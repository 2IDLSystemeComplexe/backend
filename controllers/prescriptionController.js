const Prescription = require('../models/Prescription');
const QRCode = require('qrcode');
const Appointment  = require('../models/Appointment');
const mongoose = require('mongoose');

exports.createPrescription = async (req, res) => {
  try {
    const { appointmentId, medications } = req.body;

    const prescriptionData = {
      appointment: appointmentId, // correction ici
      medications
    };

    // Générer QR Code avec les données importantes
    const qrData = JSON.stringify({ appointmentId, medications });
    const qrCodeImage = await QRCode.toDataURL(qrData);

    prescriptionData.qrCode = qrCodeImage;

    const prescription = new Prescription(prescriptionData);
    await prescription.save();

    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPrescriptionByAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    // Cherche sur le champ "appointment", pas "appointmentId"
    const prescription = await Prescription.findOne({ appointment: appointmentId }).populate('appointment');

    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found for this appointment' });
    }

    res.json(prescription);
  } catch (error) {
    console.error('Error fetching prescription:', error);
    res.status(500).json({ message: error.message });
  }
};