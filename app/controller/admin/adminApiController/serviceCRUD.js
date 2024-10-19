const serviceRepository = require("../../../repositories/serviceRepository");


class ServiceCrudController {

    // Create a new service
    async createService(req, res) {
        try {
            const result = await serviceRepository.createService(req.body, req.file);
            if (result) {
                res.redirect('/admin/servicepage');
            } else {
                res.redirect('/addform');
            }
        } catch (err) {
            console.error(err);
            res.redirect('/addform');
        }
    }

    // Update a service
    async updateService(req, res) {
        const id = req.params.id;
        try {
            await serviceRepository.updateService(id, req.body, req.file);
            res.redirect('/admin/servicepage');
        } catch (err) {
            console.error(err);
            res.redirect('/admin/servicepage');
        }
    }

    // Delete a service
    async deleteService(req, res) {
        const id = req.params.id;
        try {
            await serviceRepository.deleteService(id);
            res.redirect('/admin/servicepage');
        } catch (err) {
            console.error(err);
            res.redirect('/admin/servicepage');
        }
    }

    // Render add service form
    async addServiceForm(req, res) {
        res.render('admin/layouts/add_serviceform', {
            title: 'Add Service Form Page'
        });
    }

    // Render edit service form
    async editService(req, res) {
        const id = req.params.id;
        try {
            const editdata = await serviceRepository.findServiceById(id);
            res.render('admin/layouts/update_service', {
                d: editdata,
                title: 'Update Page',
                adata:req.admin
            });
        } catch (err) {
            console.log(err);
            res.redirect('/admin/servicepage');
        }
    }
}

module.exports = new ServiceCrudController();
