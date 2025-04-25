const Patient = require('../models/Patient');
const User = require('../models/Users');
const Appointment = require('../models/Appointment');
const bcrypt = require('bcryptjs');

// Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Create new patient
exports.createPatient = async (req, res) => {
  try {
    const { username, email, password, medicalHistory, phone, localisation, age, gender } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPatient = new Patient({
      username,
      email,
      password: hashedPassword,
      medicalHistory,
      phone,
      localisation,  // Must contain { street, city }
      age,
      gender
    });

    await newPatient.save();

    res.status(201).json(newPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Update patient
exports.updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete patient

exports.deletePatient = async (req, res) => {
  try {
    // Trouver le patient
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Supprimer les rendez-vous liés à ce patient
    await Appointment.deleteMany({ patient: patient._id });

    // Supprimer le patient
    await Patient.findByIdAndDelete(patient._id);

    res.status(200).json({ message: 'Patient and related appointments deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

