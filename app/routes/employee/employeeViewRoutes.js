// routes/employeeRoutes.js
const express = require('express');
const employeeViewController = require('../../controller/employee/employeeViewController');
const { isEmployee } = require('../../middleware/AuthVerification');

const router = express.Router();
 
router.get('/bookingpage',isEmployee,employeeViewController.AuthEmployee,employeeViewController.bookings)

router.get('/',employeeViewController.loginview)

module.exports = router;
