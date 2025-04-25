const Doctor = require('../models/Doctor');
const Appointment =  require('../models/Appointment');
const bcrypt = require('bcryptjs');
exports.createDoctor= async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    const hashedPassword = await bcrypt.hash(newDoctor.password, 10);
    newDoctor.password=hashedPassword;
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getDoctorsList= async (req, res) => {
    try {
      const doctors = await Doctor.find();
      res.json(doctors);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};
//getDoctorByCity

exports.getDoctorsByCity = async(req, res) => {
  const { city } = req.params;
  try{
    const filter = {};
    if (city) {
      filter['localisation.city'] = city;
    }
    const doctors = await Doctor.find(filter);
    res.status(200).json(doctors);
}catch (err) {
  console.error('Erreur lors de la récupération des docteurs:', err);
  res.status(500).json({ message: 'Erreur serveur' });
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
//CityAndSpec
exports.getDoctorsByCityAndSpeciality = async (req, res) => {
const { city, specialization } = req.params; // utilisation de query params

  try {
    const filter = {};

    if (city) {
      filter['localisation.city'] = city;
    }

    if (specialization) {
      filter.specialization = specialization;
    }

    const doctors = await Doctor.find(filter);

    if (!doctors || doctors.length === 0) {
      return res.status(404).json({ message: 'Aucun docteur trouvé avec ces critères' });
    }

    res.status(200).json(doctors);
  } catch (err) {
    console.error('Erreur lors de la récupération des docteurs:', err);
    res.status(500).json({ message: 'Erreur serveur' });
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



