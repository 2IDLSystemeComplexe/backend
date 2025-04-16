const express = require('express');
const router = express.Router();
const doctorController=require('../controllers/doctorController');
router.post('/api/doctors',doctorController.createDoctor);
router.get('api/doctors',doctorController.getDoctorsList);
router.get('/doctors/speciality/:speciality', doctorController.getDoctorsBySpeciality);
module.exports = router;