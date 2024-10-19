
class AllemployeeApiController{

    // 

    bookings = async (req, res) => {
        try{    
          const employee = await User.findById(req.employee.id); // req.admin.id should be the ID of the logged-in admin
          const bookings = await Booking.find({ 
            assignedTo: employee._id 
          }).populate('service'); // Populate service to get service details

           res.status(200).json({
          message:'booking fetched',
            edata:req.employee,
            bookings
          });
    
        }catch(error){
            res.status(500).send({
                status:false,
                message:'cant fetched booking'
            });
        }
      };

}
module.exports=new AllemployeeApiController()