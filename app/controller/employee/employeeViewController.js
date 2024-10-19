const Booking = require("../../model/bookingModel");
const User = require("../../model/userModel");



class employeeViewController{


    AuthEmployee = (req, res, next) => {
        if (req.employee){
            console.log(req.employee);
            console.log('after login user',req.employee);
            
            next()
        } else {
            console.log( 'Error While Auth'); 
            res.redirect('/signin')
        }
    }

    bookings = async (req, res) => {
        try{    
          const employee = await User.findById(req.employee.id); // req.admin.id should be the ID of the logged-in admin
          const bookings = await Booking.find({ 
            assignedTo: employee._id 
          }).populate('service'); // Populate service to get service details

           res.render("employee/layouts/booking", {
            title: "booking",
            edata:req.employee,
            bookings
          });
    
        }catch(error){
          console.log(error);
        }
      };


      //employee login 
loginview = async (req, res) => {
  try{    
     res.render("employee/layouts/employeeLogin", {
      title: "login",
      edata:req.employee
    });

  }catch(error){
    console.log(error);
  }
};
}

module.exports = new employeeViewController()