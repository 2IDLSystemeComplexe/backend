const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/role');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', auth, userController.profile);
router.post('/reset-password',userController.resetPassword);
router.post('/request-reset',userController.requestResetPassword);
router.post('/byRole',userController.getUsersByRole);


module.exports = router;
