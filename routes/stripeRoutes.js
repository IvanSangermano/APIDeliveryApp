const categoriesController = require('../controllers/categoriesController')
const passport = require('passport')
const stripeController = require('../controllers/stripeController')

module.exports = (app) => {
    app.post('/api/stripe/create', passport.authenticate('jwt', {session: false}), stripeController.createPayment)
}