const Booking = require("../../model/bookingModel");
const Service = require("../../model/service");
const User = require("../../model/userModel")


class customerViewController{


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



   //home
   home = async (req, res) => {
    try{    
       res.render("customer/layouts/home", {
        title: "home",
        data:req.user
      });

    }catch(error){
      console.log(error);
    }
  };

    //about
    about = async (req, res) => {
        try{    
           res.render("customer/layouts/about", {
            title: "about",
            data:req.user
          });
    
        }catch(error){
          console.log(error);
        }
      };

      //booking
      // booking = async (req, res) => {
      //   try{    
      //      res.render("customer/layouts/booking", {
      //       title: "booking",
      //       data:req.user
      //     });
    
      //   }catch(error){
      //     console.log(error);
      //   }
      // };

      //booking success page
      success_booking_page = async (req, res) => {
        const { bookingId } = req.params;
        try{    
          const booking = await Booking.findById(bookingId).populate('service');

        if (!booking) {
            return res.status(404).send('Booking not found');
        }

           res.render("customer/layouts/success_booking_page", {
            title: "success_booking_page",
            data:req.user,
            booking
          });
    
        }catch(error){
          console.log(error);
        }
      };

 


 
      //contact
      contact = async (req, res) => {
        try{    
           res.render("customer/layouts/contact", {
            title: "contact",
            data:req.user
          });
    
        }catch(error){
          console.log(error);
        }
      };
//--------------------------------------------------
      //service
      service = async (req, res) => {
        try{
          const sdata = await Service.find()    
           res.render("customer/layouts/service", {
            title: "service",
            sdata,
            data:req.user
          });
    
        }catch(error){
          console.log(error);
        } 
      };
//------------------------------------------------------
      //team
      team = async (req, res) => {
        try{  
          const tmdata = await User.find({role:'employee'})
           res.render("customer/layouts/employee", {
            title: "team",
            data:req.user,
            tmdata
          });
    
        }catch(error){
          console.log(error);
        }
      };

       //testimonial
       testimonial = async (req, res) => {
        try{    
           res.render("customer/layouts/testimonial", {
            title: "testimonial",
            data:req.user
          });
    
        }catch(error){
          console.log(error);
        }
      };


      //login
      login = async (req, res) => {
        try{    
           res.render("customer/layouts/customerLogin", {
            title: "login",
            data:req.user
          });
    
        }catch(error){
          console.log(error);
        }
      };

      //signup
      signup = async (req, res) => {
        try{    
           res.render("customer/layouts/customerSignup", {
            title: "signup",
            data:req.user
          });
    
        }catch(error){
          console.log(error);
        }
      };


      otpverifi=async(req,res)=>{
        
        res.render('customer/layouts/otpVerification',{
            title:'otp verify',
            data:req.user
        })
    }


     profile = async (req, res) => {
      try {
        const userId = req.user._id; // Ensure req.user is correctly populated
    
        // Log the userId for debugging
        console.log("Logged-in user ID:", userId);
    
        // Use aggregate to find bookings for the logged-in user
        const bookings = await Booking.aggregate([
          { $match: { customer: userId } }, // Match bookings where the customer field equals the logged-in user ID
          {
            $lookup: {
              from: 'services', // The name of the collection you want to join with
              localField: 'service', // Field from the bookings collection
              foreignField: '_id', // Field from the services collection
              as: 'serviceDetails' // Output array field containing the matched documents from the services collection
            }
          },
          { $unwind: '$serviceDetails' } // Deconstruct the serviceDetails array to output a document for each element
        ]);
    
        // Log the bookings for debugging
        console.log("Bookings found:", bookings);
    
        if (bookings.length === 0) {
          return res.status(404).send('No bookings found');
        }
    
        // Render the profile page with user data and bookings
        res.render('customer/layouts/profile', {
          title: 'Profile',
          data: req.user, // User details
          bookings
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
        res.status(500).send('Server Error');
      }
    };
    


  
  

}

module.exports = new customerViewController()