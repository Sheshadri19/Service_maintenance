const express = require('express')
const customerViewController = require('../../controller/customer/customerViewController')
const { CheckAuth } = require('../../middleware/AuthVerification')
const Router = express.Router()


Router.get('/home',CheckAuth,customerViewController.home)
Router.get('/about',CheckAuth,customerViewController.Authuser,customerViewController.about)
// Router.get('/booking',CheckAuth,customerViewController.Authuser,customerViewController.booking)
Router.get('/success_booking_page/:bookingId',CheckAuth,customerViewController.Authuser,customerViewController.success_booking_page)
Router.get('/contact',CheckAuth,customerViewController.Authuser,customerViewController.contact)
Router.get('/service',CheckAuth,customerViewController.Authuser,customerViewController.service)
Router.get('/team',CheckAuth,customerViewController.Authuser,customerViewController.team)
Router.get('/testimonial',CheckAuth,customerViewController.Authuser,customerViewController.testimonial)


Router.get('/signup',customerViewController.signup) 
Router.get('/signin',customerViewController.login)

Router.get('/otp/verify',customerViewController.otpverifi)

Router.get('/profile',CheckAuth,customerViewController.Authuser,customerViewController.profile)



module.exports = Router