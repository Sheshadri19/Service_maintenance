const User = require("../../model/userModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');



class employeeController{

     // employee login
     employeeLogin = async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (user.role === 'admin' || user.role === 'customer') {
            return res.status(500).send('admin and customer can not login in this page')
        }
        if (!user) return res.status(400).send('User not found');
        if (!user.isVerified) return res.status(400).send('Email not verified');

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send('Invalid password');

        const jwtToken = jwt.sign({ id: user._id, role: user.role,username:user.username }, 'ghcghvchvmjhemployee', { expiresIn: '30d' });

        res.cookie('emptoken', jwtToken, { httpOnly: true, secure: true });
       return  res.redirect('/employee/bookingpage')
    };


     //logout -------------
     employeelogout = async (req, res) => {
        try {
            res.clearCookie("emptoken");
            return res.redirect("/employee/");
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

}

module.exports = new employeeController()