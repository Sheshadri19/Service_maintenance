const Contact = require("../../../model/contact");



class contactCrudController{

//create conatct
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
        res.redirect('/home'); // Redirect to a success page or another route
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

}

module.exports = new contactCrudController()