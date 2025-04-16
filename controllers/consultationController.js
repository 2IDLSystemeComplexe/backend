const Consultation = require('../models/Consultation');
const Appointment = require('../models/Appointment');

// Créer une consultation
exports.createConsultation = async (req, res) => {
  try {
    const { appointmentId, videoCallLink } = req.body;

    // Vérifie si l’appointment existe
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const newConsultation = new Consultation({
      appointment: appointmentId,
      videoCallLink
    });

    const saved = await newConsultation.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Obtenir une consultation par ID
exports.getConsultationById = async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id)
      .populate('appointment');
    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }
    res.json(consultation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Modifier le lien de visio
exports.updateVideoCallLink = async (req, res) => {
  try {
    const { videoCallLink } = req.body;
    const updated = await Consultation.findByIdAndUpdate(
      req.params.id,
      { videoCallLink },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Consultation not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Désactiver la consultation
exports.deactivateConsultation = async (req, res) => {
  try {
    const updated = await Consultation.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Consultation not found' });
    }
    res.json({ message: 'Consultation deactivated', consultation: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
