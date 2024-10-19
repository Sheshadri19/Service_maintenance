
const User = require("../../../model/userModel");
const fs = require('fs')
const bcrypt = require('bcrypt');


class adminApiController{

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
            res.redirect('/admin/employeepage');
        } catch (err) {
            console.error('Error creating employee:', err);
            res.status(500).send('Internal Server Error');
        }
    }
    
    deleteEmployee = async (req, res) => {
        try {
            const id = req.params.id;
            const deleted = await User.findByIdAndDelete(id)
    
            if (deleted) {
                fs.unlinkSync(deleted.image);
                res.redirect('/admin/employeepage');
            }
        } catch (err) {
    
            console.error(err);
    
        }
    };

    // Render the add employee form
add_employeeform=async(req,res)=>{
    res.render('admin/layouts/add_employeeform',{
     title:'add employee form page'
    })
 }

//update
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
      
      res.redirect("/admin/employeepage");    
    } catch (err) {
      console.error(err);
    
    }
    }


    //edit employee form page
 
  editemployee = async(req,res)=>{
    try{
      const id = req.params.id
      const editdata = await User.findById(id)
    //   console.log('jj',editdata);
      if(editdata){
       res.render('admin/layouts/update_employee',{
           ed:editdata,
           title:"update page",
           adata:req.admin
       })
      }
    }catch(err){
   console.log(err);
    }
   }




    
    // assignWork = async (req, res) => {
    //     try {
    //         const { bookingId, employeeId } = req.body;
    //         await bookingRepository.updateWork(bookingId, { assignedTo: employeeId });
    //         res.redirect('/admin/works');
    //     } catch (err) {
    //         res.status(500).send(err.message);
    //     }
    // };
    

}

module.exports = new adminApiController()
