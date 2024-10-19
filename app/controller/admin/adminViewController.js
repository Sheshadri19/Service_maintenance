const Banner = require("../../model/banner");
const Booking = require("../../model/bookingModel");
const Contact = require("../../model/contact");
const Service = require("../../model/service");
const User = require("../../model/userModel");



class adminViewController{

  Authadmin = (req, res, next) => {
    if (req.admin){
        console.log('after login user',req.admin);
        return next()
    } else {
        console.log( 'Error While Auth');
        res.redirect('/')
    }
}

//admin login 
loginview = async (req, res) => {
  try{    
     res.render("admin/layouts/adminLogin", {
      title: "admin login",
      adata:req.admin
    });

  }catch(error){
    console.log(error);
  }
};

    admindashboard = async (req, res) => {
        try{    
           res.render("admin/layouts/dashboard", {
            title: "admin dashboard",
             adata:req.admin
          });
    
        }catch(error){
          console.log(error);
        }
    
      };


      //banner------------------------------------------------

      banner=async(req,res)=>{
        try{
            const data=await Banner.find()

            if(data){
                res.render('admin/layouts/banner',{
             title:'banner',
             bdata:data,
             adata:req.admin
                })
            }
         
        }catch(err){
            console.log(err);
        }
    } 

   //service------------------------------------------------

   service=async(req,res)=>{
    try{
        const data=await Service.find()

        if(data){
            res.render('admin/layouts/service',{
         title:'service',
         sdata:data,
         adata:req.admin
            })
        }
     
    }catch(err){
        console.log(err);
    }
}   


//employee------------------------------------------------

employee=async(req,res)=>{
  try{
      const data=await User.find({ role: 'employee' })

      if(data){
          res.render('admin/layouts/employee',{
       title:'employee',
       emdata:data,
       adata:req.admin
          })
      }
   
  }catch(err){
      console.log(err);
  }
}   

//booking------------------------------
booking=async(req,res)=>{
  try{
      const bookings=await Booking.find()
      .populate('service','heading')
      .populate('assignedTo','username') // Populate service to get service details
      
      const employees = await User.find({ role: 'employee' });

     
          res.render('admin/layouts/booking',{
       title:'booking',
       bookings,
       employees,
       adata:req.admin
          })
      
   
  }catch(err){
      console.log(err);
  }
} 

//contact
contact =async(req,res)=>{
  try{
      const condata=await Contact.find()

      if(condata){
          res.render('admin/layouts/contact',{
       title:'employee',
       condata,
       adata:req.admin
          })
      }
   
  }catch(err){
      console.log(err);
  }
}   


}



module.exports = new adminViewController()