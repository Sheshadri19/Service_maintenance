// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true 
    },
    email: { 
        type: String,
        required: true 
    },
    password: { 
        type: String, 
        required: true 
     },
    role: { 
        type: String,
        enum: ['admin', 'employee', 'customer'], 
        default:'customer' 
    },
    pincode: { 
        type: Number 
    },
    designation: { 
        type: String 
    },
    image: { 
        type: String 
    },
    booking:{
        type: mongoose.Schema.Types.ObjectId, 
         ref: 'booking' 
    },
    otp:{
        type:String
    }
    ,
    otpExpires:{
        type:Date
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    }
},{timestamps:true});

const User = mongoose.model('User', userSchema);

module.exports = User;
