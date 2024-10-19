
const express = require('express');
const uploads = require('../../utility/image')
const bannerCRUD = require('../../controller/admin/adminApiController/bannerCRUD');
const serviceCRUD = require('../../controller/admin/adminApiController/serviceCRUD');
const employeeCRUD = require('../../controller/admin/adminApiController/employeeCRUD');
const bookingController = require('../../controller/admin/adminApiController/bookingController');
const adminAllApiController = require('../../controller/admin/adminAllApiController');


const router = express.Router();

//banner---------------
router.post('/createBanner',uploads.single('image'),bannerCRUD.createBanner)
router.post('/updatebanner/:id',uploads.single('image'),bannerCRUD.updatebanner)
router.get('/deletebanner/:id',bannerCRUD.deletebanner)

router.get('/addform',bannerCRUD.add_bannerform)
router.get('/edit/:id',bannerCRUD.editbanner)
router.get('/statuscheck/:id',bannerCRUD.statusCheck) 

//service

router.post('/createService',uploads.single('image'),serviceCRUD.createService)
router.post('/updateservice/:id',uploads.single('image'),serviceCRUD.updateService)
router.get('/deleteservice/:id',serviceCRUD.deleteService)

router.get('/addformService',serviceCRUD.addServiceForm)
router.get('/editservice/:id',serviceCRUD.editService)

// employee

router.post('/createEmployee',uploads.single('image'),employeeCRUD.createEmployee);
router.post('/updateemployee/:id',uploads.single('image'),employeeCRUD.updateemployee)
router.get('/deleteEmployee/:id', employeeCRUD.deleteEmployee);

router.get('/addformemployee',employeeCRUD.add_employeeform)
router.get('/editemployee/:id',employeeCRUD.editemployee)

 //booking
 
router.post('/booking/status/:id',bookingController.updateBooking);
router.get('/booking/delete/:id', bookingController.deleteBooking);
router.post('/assign_booking',bookingController.assign_booking);

// contact 

router.get('/all/contact',adminAllApiController.Allcontact)



module.exports = router;
