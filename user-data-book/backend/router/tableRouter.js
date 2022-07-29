import express from 'express'
import * as tableController from '../controller/tableController.js'
import { authMiddleware } from '../middleware/userMiddleware.js'
const routes = express.Router()

// route to api/user
routes.route('/:tableName').
    post(authMiddleware, tableController.addTable).
    delete(authMiddleware, tableController.deleteTable)

export default routes