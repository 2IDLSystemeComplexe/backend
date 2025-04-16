const Appointment = require('../models/Appointment');
exports.createAppointment=async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAppointmentByPatient = async (req, res) => {
    try {
      const appointments = await Appointment.find({ patient: req.params.patientId });
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

exports.getAppointmentByDoctor=async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.params.doctorId });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAppointmentStatus=async (req, res) => {
  try {
    console.log(req.body);
    const { status } = req.body;
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateAppointment=async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
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