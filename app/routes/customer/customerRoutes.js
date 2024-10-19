// routes/customerRoutes.js
const express = require('express');
const customerController = require('../../controller/customer/customerController');
const router = express.Router();

router.post('/bookWork',customerController.bookWork );

router.post('/bookWork',customerController.bookWork );

router.post('/signup',customerController.signup)

router.post('/login',customerController.Login)

router.get('/logout',customerController.logout)

router.post('/otp/verify',customerController.verifyOTP)

router.get('/confirmation/:email/:token',customerController.confirmation)

module.exports = router;
