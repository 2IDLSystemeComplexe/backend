const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/appointments',appointmentController.createAppointment);
router.get('/appointments/patient/:patientId',appointmentController.getAppointmentByPatient);
router.get('/appointments/doctor/:doctorId',appointmentController.getAppointmentByDoctor);
router.put('/appointments/:id/status',appointmentController.updateAppointmentStatus);
router.put('/appointments/:id', appointmentController.updateAppointment);
router.delete('/appointments/:id', appointmentController.deleteAppointment);

module.exports = router;