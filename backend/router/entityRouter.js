import express from 'express'
import * as entityController from '../controller/entityController.js'
import { authMiddleware } from '../middleware/userMiddleware.js'
const routes = express.Router()

// route to api/user
routes.route('/').post(authMiddleware, entityController.addEntity)
routes.route("/:tableName").get(authMiddleware, entityController.getEntities)
routes.route('/:entityId').delete(authMiddleware, entityController.deleteEntity)

export default routes