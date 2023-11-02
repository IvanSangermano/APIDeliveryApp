require('dotenv').config(); 

const express = require('express');
const app = express();

const http  = require('http');
const server = http.createServer(app);

const logger = require('morgan');
const cors = require('cors')

//IMPORT ROUTES
const usersRoute = require('./routes/userRoutes')

//PORT
const port = process.env.PORT || 3000

//CONFIG APP
app.use(logger('dev'))
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.disable('x-powered-by')
app.set('port', port)

//ROUTES
usersRoute(app)


//START SERVER
server.listen(3000, () => {
    console.log('Servidor de Node.js en puerto ' + port + ' iniciada...')
})

//ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).send(err.stack)
})

