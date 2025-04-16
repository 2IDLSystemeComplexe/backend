const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const bcrypt = require('bcryptjs');

// Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate('appointments');
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate('appointments');
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new patient
exports.createPatient = async (req, res) => {
  try {
    const { username, email, password, medicalHistory } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newPatient = new Patient({ username, email, password: hashedPassword, medicalHistory });
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
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: 'Patient deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
