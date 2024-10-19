// controllers/adminController.js
const Booking = require('../../../model/bookingModel');
const User = require('../../../model/userModel');

class AdminBookingController {
   

    // Route to handle the assignment of bookings to employees
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

        res.redirect('/admin/bookingpage'); // Redirect back to the admin panel
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
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
        res.redirect('/admin/bookingpage');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
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
        res.redirect('/admin/bookingpage');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

}

module.exports = new AdminBookingController();
