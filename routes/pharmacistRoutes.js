const express = require('express');
const router = express.Router();
const pharmacistController = require('../controllers/pharmacistController');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/admin'); 


router.post('/', auth, isAdmin, pharmacistController.createPharmacist);
router.get('/', auth, pharmacistController.getAllPharmacists);
router.get('/:id', auth, pharmacistController.getPharmacistById);
router.put('/:id', auth, isAdmin, pharmacistController.updatePharmacist);
router.delete('/:id', auth, isAdmin, pharmacistController.deletePharmacist);

module.exports = router;
