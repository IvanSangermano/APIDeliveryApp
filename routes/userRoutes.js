const usersController = require('../controllers/usersController')
const passport = require('passport')

module.exports = (app, upload) => {

    app.get('/api/users/findDeliveryMen', passport.authenticate('jwt', {session: false}), usersController.findDeliveryMan)
    app.post('/api/users/create', usersController.register)
    app.post('/api/users/createWithImage', upload.array('image', 1), usersController.registerWithImage)
    app.post('/api/users/login', usersController.login)
    app.put('/api/users/update', passport.authenticate('jwt', {session: false}), upload.array('image', 1), usersController.UpdateWithImage)
    app.put('/api/users/updateWithoutImage', passport.authenticate('jwt', {session: false}), usersController.UpdateWithoutImage)
    app.put('/api/users/updateNotificationToken', passport.authenticate('jwt', {session: false}), usersController.UpdateNotificationToken)


}