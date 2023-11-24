require('dotenv').config() 

const express = require('express')
const app = express()

const http  = require('http')
const server = http.createServer(app)

const logger = require('morgan')
const cors = require('cors')

const passport = require('passport')

const multer = require('multer')

const io = require('socket.io')(server)

const mercadopago = require('mercadopago')
mercadopago.configure({
    sandbox: true,
    access_token: "TEST-2633768026562283-112216-1867e1e2623b2ff137e4f5b9af5c5c41-229371624"
})

//IMPORT SOCKETS
const ordersSocket = require('./sockets/ordersSocket')

//IMPORT ROUTES
const usersRoute = require('./routes/userRoutes')
const categoriesRoutes = require('./routes/categoryRoutes')
const productsRoutes = require('./routes/productsRoutes')
const addressRoutes = require('./routes/addressRoutes')
const ordersRoutes = require('./routes/orderRoutes')
const mercadoPagoRoutes = require('./routes/mercadoPagoRoutes')


//PORT
const port = process.env.PORT || 3000

//CONFIG APP
app.use(cors());

app.use(passport.initialize());
app.use(passport.session())
require('./config/passport')(passport)

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));
app.use(logger('dev'))
app.disable('x-powered-by')

app.set('port', port)

ordersSocket(io)

const upload = multer({
    storage: multer.memoryStorage()
})

//ROUTES
usersRoute(app, upload)
categoriesRoutes(app, upload)
productsRoutes(app, upload)
addressRoutes(app)
ordersRoutes(app)
mercadoPagoRoutes(app)

//START SERVER
server.listen(3000, "localhost", () => {
    console.log('Servidor de Node.js en puerto ' + port + ' iniciada...')
})

//ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).send(err.stack)
})

