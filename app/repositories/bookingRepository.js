// repositories/workRepository.js
const Booking = require('../model/bookingModel');

class bookingRepository {
    async createWork(workData) {
        const booking = new Booking(bookingData);
        return booking.save();
    }

    async updateWork(bookingId, updateData) {
        return Booking.findByIdAndUpdate(bookingId, updateData, { new: true });
    }

    async findWorkById(bookingId) {
        return Booking.findById(bookingId).populate('assignedTo');
    }

    async findAllWorks() {
        return Booking.find().populate('assignedTo');
    }
}

module.exports = new bookingRepository();
