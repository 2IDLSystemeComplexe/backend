const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');

router.post('/',prescriptionController.createPrescription);
router.get('/appointment/:appointmentId', prescriptionController.getPrescriptionByAppointment);





module.exports = router;