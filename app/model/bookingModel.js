// models/workModel.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    service: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'service' 
       },
    service_date: { 
        type: Date, 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    pincode: { 
        type: Number 
    },
    assignedTo: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'User' 
        },
    status: { 
        type: String, 
        enum: ['pending', 'completed'],  
        default: 'pending' 
    },
    customer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
});

const Booking = mongoose.model('booking', bookingSchema);

module.exports = Booking;
