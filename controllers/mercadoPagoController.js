const mercadopago = require('mercadopago')
const Order = require('../models/order')
const OrderHasProduct = require('../models/order_has_products')

mercadopago.configure({
    sandbox: true,
    access_token: "TEST-2633768026562283-112216-1867e1e2623b2ff137e4f5b9af5c5c41-229371624"
})

module.exports = {

    async createPayment(req, res) {

        let payment = req.body

        const payment_data = {
            token: payment.token,
            issuer_id: payment.issuer_id,
            payment_method_id: payment.payment_method_id,
            transaction_amount: payment.transaction_amount,
            installments: parseInt(payment.installments),
            payer: {
                email: payment.payer.email,
                identification: {
                    type: payment.payer.identification.type,
                    number: payment.payer.identification.number
                }
            }
        }

        const data = await mercadopago.payment.create(payment_data).catch((err) => {
            console.log('Error de mercado pago: ', err)
            return res.status(501).json({
                success: false,
                message: 'Hubo un error en el momento de crear el pago',
                error: err
            }) 
        })

        if(data !== undefined && data !== null) {
            console.log('Los datos del cliente son correctos: ', data.response)

            const order = payment.order

            Order.create(order, async (err, id) => {

                if(err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con la creacion de la orden',
                        error: err
                    })
                }
    
                for (const product of order.products) {
                    await OrderHasProduct.create(id, product.id, product.quantity, (err, id_data) => {
                        if(err) {
                            return res.status(501).json({
                                success: false,
                                message: 'Hubo un error con la creacion de los productos en la orden',
                                error: err
                            })
                        }
                    })
                }
    
                return res.status(201).json({
                    success: true,
                    message: 'La orden se ha creado correctamente',
                    data: data.response
                })
                
            })
        } else {
            return res.status(401).json({
                success: false,
                message: 'Error con algun dato en la peticion',
            })
        }

    }

}