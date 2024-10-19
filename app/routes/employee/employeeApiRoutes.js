
const express = require('express');
const employeeApiController = require('../../controller/employee/employeeApiController');

const router = express.Router();


//login
router.post('/login',employeeApiController.employeeLogin)
router.get('/logout',employeeApiController.employeelogout)

module.exports = router;
