const Booking = require("../../../model/bookingModel");
const Service = require("../../../model/service");
const User = require("../../../model/userModel");




class bookingCrudController{


    Authuser = (req, res, next) => {
        if (req.user){
            console.log(req.user);
            console.log('after login user',req.user);
            
            next()
        } else {
            console.log( 'Error While Auth');
            res.redirect('/signin')
        }
    }

//create booking
createBooking = async (req, res) => {
    const { name, email, service, service_date,pincode, message} = req.body;
    try {
        const newBooking = new Booking({
            name,
            email,
            service,
            service_date,
            pincode,
            message,
            // assignedTo: employee._id // Assign to the selected employee
        });
        await newBooking.save();
        res.redirect(`/success_booking_page/${newBooking._id}`); // Redirect to a success page or another route
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

// Render the booking form ----------

booking_form = async (req, res) => {
    try {
        const services = await Service.find(); // Fetch available services
        res.render('customer/layouts/booking', { 
            title:"booking",
            services:services,
            data:req.user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

}
 
module.exports = new bookingCrudController()