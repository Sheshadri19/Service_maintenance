const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')
const connectDB = require('./app/config/dbcon')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');

dotenv.config()
connectDB()
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public/admin')))
app.use(express.static(path.join(__dirname,'public/customer')))
app.use("/uploads",express.static(path.join(__dirname,'uploads')))

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


//admin routes -----------------------------------------------------------
const adminViewRoutes = require('./app/routes/admin/viewRoutes')
app.use('/admin',adminViewRoutes)

const adminApiRoutes = require('./app/routes/admin/adminApiRoutes')
app.use('/admin',adminApiRoutes)

const adminRoutes = require('./app/routes/admin/adminRoutes')
app.use('/admin',adminRoutes)

//employee routes ---------------------------------------------------------------------
const employeeViewRoutes = require('./app/routes/employee/employeeViewRoutes')
app.use('/employee',employeeViewRoutes)

const employeeApiRoutes = require('./app/routes/employee/employeeApiRoutes')
app.use('/employee',employeeApiRoutes)

const employeeAllApiRoute=require('./app/routes/employee/EmployeeAllApiRoute')
app.use(employeeAllApiRoute)

//customer routes -----------------------------------------------------------------------
const customerRoutes = require('./app/routes/customer/customerRoutes')
app.use('/customer',customerRoutes)

const customerapiRoutes = require('./app/routes/customer/customerApiRoutes')
app.use(customerapiRoutes)

const customerViewRoutes = require('./app/routes/customer/customerViewRouter')
app.use(customerViewRoutes)



const port = 7593
app.listen(port,()=>{
    console.log(`surver running at http://localhost:${port}`);
})
  
