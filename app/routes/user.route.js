const UserController = require('../Controllers/user.controller.js')
const {verifyToken} = require('../middlewares/auth.jwt')
const {ownAccount, validateUserSignUp} = require('../middlewares/authoriztion')
require('dotenv').config()

module.exports = (express, app, default_router = '/api') => {
    const router = express.Router()

    // auth
    router.post('/signup', [validateUserSignUp], UserController.signUp)
    router.post('/signin', UserController.signIn)


    router.get('/users', [verifyToken], UserController.getAllUser)
    router.get('/users/:id', [verifyToken], UserController.getDetailUser)
    router.put('/users/:id', [verifyToken, ownAccount], UserController.updateUser)

    app.use(default_router, router)
}