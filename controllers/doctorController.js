const Doctor = require('../models/Doctor');
exports.createDoctor= async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getDoctorsList= async (req, res) => {
    try {
      const doctors = await Doctor.find().populate('user');
      res.json(doctors);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


exports.getDoctorsBySpeciality = async (req, res) => {
  const { specialization } = req.params;

  try {
    const doctors = await Doctor.find({ specialization });
    if (!doctors || doctors.length === 0) {
      return res.status(404).json({ message: 'No doctors found for this speciality' });
    }
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
