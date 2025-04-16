const Prescription = require('../models/Prescription');
const QRCode = require('qrcode');

exports.createPrescription = async (req, res) => {
  try {
    const { consultation, patient, doctor, medications } = req.body;

    const prescriptionData = {
      consultation,
      patient,
      doctor,
      medications
    };

    // Générer QR Code avec les données importantes
    const qrData = JSON.stringify({ consultation, patient, doctor, medications });
    const qrCodeImage = await QRCode.toDataURL(qrData);

    prescriptionData.qrCode = qrCodeImage;

    // Tu pourras ajouter ici la signature avec TunTrust (à venir)
    prescriptionData.signature = 'SIGNATURE_PLACEHOLDER';

    const prescription = new Prescription(prescriptionData);
    await prescription.save();

    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
