const express = require("express");
const adminViewController = require("../../controller/admin/adminViewController");
const { jwtAuthAdmin } = require("../../middleware/AuthVerification");
const router = express.Router();


router.get('/dashboard',jwtAuthAdmin,adminViewController.Authadmin,adminViewController.admindashboard)
router.get('/bannerpage',jwtAuthAdmin,adminViewController.Authadmin,adminViewController.banner)
router.get('/servicepage',jwtAuthAdmin,adminViewController.Authadmin,adminViewController.service)
router.get('/employeepage',jwtAuthAdmin,adminViewController.Authadmin,adminViewController.employee)

router.get('/bookingpage',jwtAuthAdmin,adminViewController.Authadmin,adminViewController.booking)
router.get('/contactpage',jwtAuthAdmin,adminViewController.Authadmin,adminViewController.contact)

router.get('/signin',adminViewController.loginview)


module.exports = router