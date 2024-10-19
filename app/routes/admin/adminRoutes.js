// routes/adminRoutes.js
const express = require('express');
const adminController = require('../../controller/admin/adminController');
const router = express.Router();


//login
router.post('/login',adminController.adminLogin)

// logout

router.get('/logout',adminController.adminlogout)

module.exports = router;
