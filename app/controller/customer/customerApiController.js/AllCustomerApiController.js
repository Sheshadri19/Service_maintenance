

class AllCustomerApiController{

    // create Booking 

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
          res.status(201).json({
            status:true,
            message:'booking added',
            data:newBooking
          })
        } catch (error) {
            console.error(error);
            res.status(500).send({
                status:false,
                message:'cant add booking'
            });
        }
    }

    // All Booking

    booking_form = async (req, res) => {
        try {
            const services = await Service.find(); // Fetch available services
           res.status(200).json({
            status:true,
            total:services.length,
            message:'all service data',
            data:services
           })
        } catch (error) {
           
            res.status(500).send({
                status:false,
                message:'cant fetch all service'
            });
        }
    }

    // create contact 
    createContact = async (req, res) => {
        const { name, email, subject,message } = req.body;
        try {
    
            const newContact = new Contact({
                name,
                email,
                subject,
                message
            });
            await newContact.save();
            res.status(201).json({
                status:true,
                message:'contact added',
                data:newContact
              })
        } catch (error) {
            console.error(error);
            res.status(500).send({
                status:false,
                message:'cant add contcat'
            });
        }
    }

}

module.exports=new AllCustomerApiController()