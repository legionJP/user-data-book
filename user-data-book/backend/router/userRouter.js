import express from 'express'
import * as userController from '../controller/userController.js'
const routes = express.Router()

// route to api/user
routes.route('/signup').post(userController.registerUser)
routes.route('/login').post(userController.loginUser)

export default routes