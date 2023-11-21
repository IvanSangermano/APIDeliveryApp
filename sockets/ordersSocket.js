module.exports = (io) => {
    const namespace = io.of('/orders/delivery')

    namespace.on('connection', (socket) => {
        console.log('Un cliente se conecto a socketIO -> /orders/delivery')

        socket.on('position', (data) => {
            console.log('Cliente emitio: ', data);
            namespace.emit(`position/${data.id_order}`, { id_order: data.id_order, lat: data.lat, lng: data.lng})
        })

        socket.on('disconnect', (data) => {
            console.log('un cliente se desconecto de socketIO')
        })
    })
}