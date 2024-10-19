const Banner = require("../../../model/banner")
const fs = require('fs')


class bannerCrudController{

// create
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

        if (result) {
            res.redirect('/admin/bannerpage')

        }
        else {
            res.redirect('/addform')
        }
    }
    catch (err) {
         console.log(err);
    }

}


//update

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
  
  res.redirect("/admin/bannerpage");    
} catch (err) {
  console.error(err);

}
}




//delete

deletebanner = async (req, res) => {

    try {
        const id = req.params.id;
        const deleted = await Banner.findByIdAndDelete(id)

        if (deleted) {
            fs.unlinkSync(deleted.image);
            res.redirect('/admin/bannerpage');
        }
    } catch (err) {

        console.error(err);

    }

}

// add form
add_bannerform=async(req,res)=>{
    res.render('admin/layouts/add_bannerform',{
     title:'add banner form page'
    })
 }
 
 //edit banner form page
 
  editbanner = async(req,res)=>{
     try{
       const id = req.params.id
       const editdata = await Banner.findById(id)
     //   console.log('jj',editdata);
       if(editdata){
        res.render('admin/layouts/update_banner',{
            d:editdata,
            title:"update page"
        })
       }
     }catch(err){
    console.log(err);
     }
    }


    // status check

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
            res.redirect('/admin/layouts/allCourse')
    
        }catch(err){
    
            console.log(err);
        }
      }



    

}

module.exports = new bannerCrudController()