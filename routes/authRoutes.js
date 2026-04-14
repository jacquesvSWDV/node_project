const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');



router.get('/generate-token', authController.generateToken);

router.post('/verify-token', authController.verifyToken);





module.exports = router;