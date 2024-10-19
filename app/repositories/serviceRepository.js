const fs = require('fs');
const Service = require('../model/service');


class ServiceRepository {
    
    // Create a new service
    async createService(data, file) {
        try {
            const adddata = new Service({
                heading: data.heading,
                description: data.description
            });
            if (file) {
                adddata.image = file.path;
            }
            const result = await adddata.save();
            return result;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    // Update a service
    async updateService(id, data, file) {
        try {
            const service = await Service.findById(id);
            if (!service) throw new Error('Service not found');
            
            // Remove the previous image file if a new image was uploaded
            if (file) {
                fs.unlinkSync(service.image);
                data.image = file.path;
            }
            
            const updatedService = await Service.findByIdAndUpdate(
                id,
                {
                    heading: data.heading,
                    description: data.description,
                    image: data.image
                },
                { new: true }
            );
            
            return updatedService;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    // Delete a service
    async deleteService(id) {
        try {
            const deleted = await Service.findByIdAndDelete(id);
            if (!deleted) throw new Error('Service not found');
            
            fs.unlinkSync(deleted.image);
            return deleted;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    // Find a service by id
    async findServiceById(id) {
        try {
            const service = await Service.findById(id);
            if (!service) throw new Error('Service not found');
            return service;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = new ServiceRepository();
