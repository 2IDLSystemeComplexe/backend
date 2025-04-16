const Doctor = require('../models/Doctor');
const Appointment =  require('../models/Appointment');
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
      const doctors = await Doctor.find().populate('users');
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
//getById

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json(doctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


//update

exports.updateDoctor = async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(updatedDoctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//delete 

exports.deleteDoctor = async (req, res) => {
  try {
    // Trouver le médecin
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Supprimer les rendez-vous liés à ce médecin
    await Appointment.deleteMany({ doctor: doctor._id });

    // Supprimer le médecin
    await Doctor.findByIdAndDelete(doctor._id);

    res.status(200).json({ message: 'Doctor and related appointments deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



