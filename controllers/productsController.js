const Product = require('../models/product')
const storage = require('../utils/cloud_storage')
const asyncForEach = require('../utils/async_foreach')

module.exports = {

    findByCategory(req, res){
        const id_category = req.params.id_category

        Product.findByCategory(id_category, (err, data) => {
            if(err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con al momento de listar los productos',
                    error: err
                })
            }
            return res.status(201).json(data)
        })
    },

    create(req, res){
        const product = JSON.parse(req.body.product)
        const files = req.files

        let inserts = 0

        if(files.lenght === 0){
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el registro del producto, no tiene imagenes',
            })
        } else {
            Product.create(product, (err, id_product) => {
                if(err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con el registro del producto',
                        error: err
                    })
                }

                product.id = id_product
                const start = async () => {
                    await asyncForEach(files, async (file) => {
                        const path = `image_${Date.now()}`
                        const url = await storage(file, path)
            
                        if(url != undefined && url != null){
                            if(inserts == 0) {          //imagen 1
                                product.image1 = url
                            } else if (inserts == 1){   //imagen 2
                                product.image2 = url
                            } else if (inserts == 2){   //imagen 3
                                product.image3 = url
                            }
                        }


                        await Product.update(product, (err, data) => {
                            if(err) {
                                return res.status(501).json({
                                    success: false,
                                    message: 'Hubo un error con el registro del producto',
                                    error: err
                                })
                            }

                            inserts = inserts + 1

                            if(inserts == files.length){ //si se concreto la subida de las 3 imagenes a firebas
                                return res.status(201).json({
                                    success: true,
                                    message: 'El producto se ha creado correctamente',
                                    data: data
                                })
                            }
                        })
                    })
                }
                start()
            })
        }
    },

    update(req, res) {
        const product = req.body

        Product.update(product, (err, data) => {
            if(err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la actualizacion del producto',
                    error: err
                })
            }
            return res.status(201).json({
                success: true,
                message: 'El producto se ha actualizado correctamente',
                data: data
            })
        })
    },

    updateWithImage(req, res){
        const product = JSON.parse(req.body.product)
        const files = req.files
        let inserts = 0

        if(files.lenght === 0){
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con la actualizacion del producto, no tiene imagenes',
            })
        } else {
            const start = async () => {
                const arrayImg = [product.image1, product.image2, product.image3]
                
                await asyncForEach(files, async (file) => {
                    if(arrayImg[inserts].slice(0, 4) == "file") {
                        const path = `image_${Date.now()}`
                        const url = await storage(file, path)

                        if(url != undefined && url != null){
                            if(inserts == 0) {          //image 1
                                product.image1 = url
                            } else if (inserts == 1){   //image 2
                                product.image2 = url
                            } else if (inserts == 2){   //image 3
                                product.image3 = url
                            }
                        }
                    } 

                    inserts += 1
                    if(inserts == files.length){ //si se concreto la subida de las 3 imagenes a firebase
                        updateProductImage()
                    }
                })
                
            }
            const updateProductImage =  () => {
                Product.update(product, (err, data) => {
                    if(err) {
                        return res.status(501).json({
                            success: false,
                            message: 'Hubo un error con la actualizacion del producto',
                            error: err
                        })
                    }
                    return res.status(201).json({
                        success: true,
                        message: 'El producto se ha actualizado correctamente',
                        data: data
                    })
                })
            } 
            start()
        }
    },

    delete(req, res){
        const id = req.params.id

        Product.delete(id, (err, id) => {
            if(err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con al momento de eliminar el producto',
                    error: err
                })
            }
            return res.status(201).json({
                success: true,
                message: 'El producto se ha eliminado correctamente',
                data: `${id}`
            })
        })
    },
}