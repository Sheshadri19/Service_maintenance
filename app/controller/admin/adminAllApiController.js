const serviceRepository = require("../../repositories/serviceRepository")

class AllApiController{

    // add banner

    createBanner = async (req,res) => {

        try { 

            const adddata =  new Banner({
                sub_heading:req.body.sub_heading,
                heading:req.body.heading,
                description:req.body.description
                
            })
            if (req.file) {
                adddata.image = req.file.path
            }
            const result = await adddata.save()
    
            res.status(201).json({
                status:true,
                message:'banner added',
                data:result
            })
        }
        catch (err) {
             res.status(500).json({
                status:false,
                message:'banner not added'
             })
        }
    
    }

    // update banner

    updatebanner = async(req,res)=>{
        const id = req.params.id;
        const newImage = req.file.path;
        
        try {
            //Remove the previous image file if a new image was uploaded
            const df=await Banner.findById(id)
            fs.unlinkSync(df.image)
          const updatedUser = await Banner.findByIdAndUpdate(
            id,
            {
                sub_heading:req.body.sub_heading,
                heading:req.body.heading,
                description:req.body.description,
                image:newImage
                
            },  
            { new: true }
          );

          
          res.status(200).json({
            status:true,
            message:'banner updated',
            data:updatedUser
        })
          
           
        } catch (err) {
            res.status(500).json({
                status:false,
                message:'banner not updated'
             })
        
        }
        }

        // delete banner 

        deletebanner = async (req, res) => {

            try {
                const id = req.params.id;
                const deleted = await Banner.findByIdAndDelete(id)
        
                if (deleted) {
                    fs.unlinkSync(deleted.image);

                    res.status(200).json({
                        status:true,
                        message:'banner deleted',
                        data:deleted
                    })
                }
            } catch (err) {
        
                res.status(500).json({
                    status:false,
                    message:'banner not delete'
                 })
        
            }
        
        }

        // banner status 

        statusCheck=async(req,res)=>{
            try{
        
                const id=req.params.id
                const statdata=await Banner.findById(id)
         
                if(statdata.status=== false){
                    statdata.status=true
                }else{
                    statdata.status=false
                }
        
                await statdata.save()
              
                res.status(200).json({
                    status:true,
                    message:'banner status updated',
                    data:statdata
                })

            }catch(err){
        
                res.status(500).json({
                    status:false,
                    message:'banner status not updated'
                 })
            }
          }


        //   Add service

        createService=async(req, res)=>{
            try {
                const result = await serviceRepository.createService(req.body, req.file);
                if (result) {
                    res.status(200).json({
                        status:true,
                        message:'data added',
                        data:result
                    })
                }
            } catch (err) {
                res.status(500).json({
                    status:false,
                    message:'service data not added'
                 })
            }
        }

        // Update Service

         updateService=async(req, res)=> {
            const id = req.params.id;
            try {
              const updateDat=  await serviceRepository.updateService(id, req.body, req.file);
                res.status(200).json({
                    status:true,
                    message:'service updated',
                    data:updateDat
                })
            } catch (err) {
                res.status(500).json({
                    status:false,
                    message:'service data not added'
                 })
            }
        }

        // service deeleted

        deleteService= async(req, res)=> {
            const id = req.params.id;
            try {
                const deldat=await serviceRepository.deleteService(id);
                res.status(200).json({
                    status:true,
                    message:'service deleted',
                    data:deldat
                })
            } catch (err) {
                console.error(err);
                res.status(500).json({
                    status:false,
                    message:'service data not deleted'
                 })
            }
        }

        // create employee

        createEmployee = async (req, res) => {
            const { username,pincode,designation } = req.body;
        
            try {
                // const hashedPassword = await bcrypt.hash(password, 10);
                const newEmployee = new User({
                    username,
                    pincode,
                    designation,
                    // email,
                    // password: hashedPassword,
                    role: 'employee',
                });
                if (req.file) {
                    newEmployee.image = req.file.path
                }
        
                await newEmployee.save();
                res.status(201).json({
                    status:true,
                    message:'employee added',
                    data:newEmployee
                })
               
            } catch (err) {
                res.status(500).json({
                    status:false,
                    message:'employee cant add'
                 })
            }
        }


        // update employee
        updateemployee = async(req,res)=>{
            const id = req.params.id;
            const newImage = req.file.path;
            
            try {
                //Remove the previous image file if a new image was uploaded
                const df=await User.findById(id)
                // fs.unlinkSync(df.image)
              const updatedUser = await User.findByIdAndUpdate(
                id,
                {
                    username:req.body.username,
                    pincode:req.body.pincode,
                    designation:req.body.designation,
                    image:newImage
                    
                },  
                { new: true }
              );
              
              res.status(200).json({
                status:true,
                message:'employee updated',
                data:updatedUser
            })
            } catch (err) {
                res.status(500).json({
                    status:false,
                    message:'employee cant add'
                 })
            
            }
            }


            // delete employee

            deleteEmployee = async (req, res) => {
                try {
                    const id = req.params.id;
                    const deleted = await User.findByIdAndDelete(id)
            
                    if (deleted) {
                        fs.unlinkSync(deleted.image);
                        res.status(200).json({
                            status:true,
                            message:'service deleted',
                            data:deleted
                        })
                    }
                } catch (err) {
            
                    res.status(500).json({
                        status:false,
                        message:'employee cant delete'
                     })
            
                }
            };


            // assign booking api

            assign_booking = async (req, res) => {

                const { bookingId, assignedTo } = req.body;
            
                try {
                    // Ensure both bookingId and assignedTo are provided
                    if (!bookingId || !assignedTo) {
                        return res.status(400).send('Booking ID and employee must be specified');
                    }
            
                    // Find the booking and update its assigned employee
                    const booking = await Booking.findById(bookingId);
            
                    if (!booking) {
                        return res.status(404).send('Booking not found');
                    }
            
                    // Verify that the employee exists
                    const employee = await User.findById(assignedTo);
            
                    if (!employee || employee.role !== 'employee') {
                        return res.status(400).send('Invalid employee selected');
                    }
            
                    // Update the booking with the new employee assignment
                    booking.assignedTo = employee._id;
                    await booking.save();
            
                   res.status(200).send({
                    status:true,
                    message:'assign successful'
                   })
                } catch (error) {
                    res.status(500).json({
                        status:false,
                        message:'cant assign booking'
                     })
                }
            }

             // Update booking status
updateBooking = async (req, res) => {
    
    try {
        const { status} = req.body;
        const { id } = req.params;


    if (status !== 'pending' && status !== 'completed') {
        return res.status(400).send('Invalid status');
    }
       // Update the order status
       await Booking.findByIdAndUpdate(
        id,
        { status: status }, // Update status to 'Confirmed' or 'Cancelled'
        { new: true } // Return the updated document
    );
        res.status(200).send({
            status:true,
            message:'status updated '
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('status cant updated');
    }
}

// Delete a booking
deleteBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const booking = await Booking.findById(bookingId);
        
        if (!booking) {
            return res.status(404).send('Booking not found');
        }

        // Delete the booking
        await Booking.findByIdAndDelete(bookingId);
        res.status(200).json({
            status:true,
            message:'booking deleted',
            
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('cant delete booking');
    }
}

// All contact show 

Allcontact =async(req,res)=>{
    try{
        const condata=await Contact.find()
  
        if(condata){
          res.status(200).json({
            status:true,
            message:'contact all',
            total:condata.length,
            data:condata
          })
        }
     
    }catch(err){
        res.status(500).send({
            status:false,
            message:'cant delete booking'
    });
    }
  }   
        

}


module.exports=new AllApiController()