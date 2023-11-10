const Category = require('../models/category')
const storage = require('../utils/cloud_storage')

module.exports = {

    async getAll(req, res){
        Category.getAll((err, data) => {
            if(err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con al momento de listar las categorias',
                    error: err
                })
            }
            return res.status(201).json(data)
        })
    },

    async create(req, res){
        const category = JSON.parse(req.body.category)

        const files = req.files;

        if(files.length > 0) {
            const path = `image_${Date.now()}`
            const url = await storage(files[0], path)

            if(url != undefined && url != null){
                category.image = url
            }
        }
        
        Category.create(category, (err, id) => {

            if(err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la creacion de la categoria',
                    error: err
                })
            }

            return res.status(201).json({
                success: true,
                message: 'La categoria se ha creado correctamente',
                data: `${id}`
            })
        })
    },

    async updateWithImage(req, res){
        const category = JSON.parse(req.body.category)

        const files = req.files;

        if(files.length > 0) {
            const path = `image_${Date.now()}`
            const url = await storage(files[0], path)

            if(url != undefined && url != null){
                category.image = url
            }
        }
        
        Category.update(category, (err, id) => {

            if(err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el actualizacion de la categoria',
                    error: err
                })
            }

            return res.status(201).json({
                success: true,
                message: 'La categoria se ha actualizado correctamente',
                data: `${category.id}`
            })
        })
    },

    async update(req, res){
        const category = req.body
        Category.update(category, (err, id) => {

            if(err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el actualizacion de la categoria',
                    error: err
                })
            }

            return res.status(201).json({
                success: true,
                message: 'La categoria se ha actualizado correctamente',
                data: `${id}`
            })
        })
    },

    async delete(req, res){
        const id = req.params.id
        Category.delete(id, (err, data) => {

            if(err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la eliminacion de la categoria',
                    error: err
                })
            }

            return res.status(201).json({
                success: true,
                message: 'La categoria se ha eliminado correctamente',
                data: `${id}`
            })
        })
    },
}