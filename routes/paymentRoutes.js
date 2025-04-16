const express = require('express');
const router = express.Router();
const paymentController=require('../controllers/paymentController');
router.post('/',paymentController.Payment);

module.exports = router;