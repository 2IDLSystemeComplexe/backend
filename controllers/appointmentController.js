const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const mongoose = require('mongoose');
const generateMeetLink = require('../utils/generateMeetLink');

exports.createAppointment = async (req, res) => {
  try {
    const { doctorId, patientId, date, time, mode } = req.body;

    const doctor = await Doctor.findById(doctorId).lean();
    const patient = await Patient.findById(patientId).lean();

    if (!doctor || !patient) {
      return res.status(404).json({ message: 'Doctor or Patient not found' });
    }

    const appointment = await Appointment.create({
      doctor,
      patient,
      date,
      time,
      mode,
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserAppointments = async (req, res) => {
  try {
    const { userId, role } = req.params; // ← missing in your version!

    if (!['doctor', 'patient'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Must be "doctor" or "patient".' });
    }

    const filterField = `${role}._id`;
     // Convert userId to ObjectId for matching embedded _id
     const objectId = new mongoose.Types.ObjectId(userId);
    const appointments = await Appointment.find({ [filterField]: objectId });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (
      status === 'Confirmed' &&
      appointment.mode === 'en ligne' &&
      !appointment.videoCallLink
    ) {
      appointment.videoCallLink = generateMeetLink(req.params.id);
    }
    appointment.status=status

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
       appointment ,
      { new: true } // Important to return the updated document
    );

    if (!updated) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    

    const updated = await Appointment.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAppointment=async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};