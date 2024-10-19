// models/userModel.js
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    image: { 
        type: String,
        required: true 
    },
    heading: { 
        type: String, 
        required: true
     },
     description: { 
        type: String, 
        required: true
     } 
},
{timestamps:true}
);

const Service = mongoose.model('service', serviceSchema);

module.exports = Service;
