const express = require('express');

const { isEmployee } = require('../../middleware/AuthVerification');
const AllemployeeApiController = require('../../controller/employee/AllemployeeApiController');
const employeeViewController = require('../../controller/employee/employeeViewController');

const router = express.Router();
 
router.get('/bookingpage',isEmployee,employeeViewController.AuthEmployee,AllemployeeApiController.bookings)


module.exports = router;
