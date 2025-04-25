const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/appointments',appointmentController.createAppointment);
router.get('/appointments/:role/:userId',appointmentController.getUserAppointments);
router.put('/appointments/:id/status',appointmentController.updateAppointmentStatus);
router.put('/appointments/:id', appointmentController.updateAppointment);
router.delete('/appointments/:id', appointmentController.deleteAppointment);
router.get('/appointments/:id', appointmentController.getAppointmentById);


module.exports = router;