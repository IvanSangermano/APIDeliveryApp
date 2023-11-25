const Order = require('../models/order')
const OrderHasProduct = require('../models/order_has_products')
const Stripe = require('stripe')
const stripe = new Stripe(process.env.secretKeyStripe)

module.exports = {

    async createPayment(req, res) {
        const data = req.body
        const order = data.order

        try {
            const payment = await stripe.paymentIntents.create({
                amount: data.amount,
                currency: 'USD',
                description: 'ECOMMERCE REACT NATIVE DELIVERY APP',
                confirm: true,
                "payment_method_types[]":"card",
                payment_method_data: {
                    type: "card",
                    "card[token]": data.id},
            })
            console.log("TRANSACCION", JSON.stringify(payment, null, 3))

            if(payment !== null && payment !== undefined){
                if(payment.status === 'succeeded'){
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
                            message: 'Transaccion exitosa, orden creada correctamente',
                            data: `${id}`
                        })
                     
                    })
                } else {
                    return res.status(400).json({
                        success: true,
                        message: 'No se pudo efectuar la transaccion',
                        data: `${id}`
                    })
                }
            } else {
                return res.status(400).json({
                    success: true,
                    message: 'No se pudo efectuar la transaccion',
                    data: `${id}`
                })
            }
            
        } catch (error) {
            console.log(error)
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con la transaccion',
                error: error
            })
        }
    }
}