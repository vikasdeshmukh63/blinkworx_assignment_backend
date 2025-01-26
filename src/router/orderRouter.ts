import { Router } from 'express'
import orderController from '../controller/orderController'

const router = Router()

router.route('/orders').post(orderController.addNeworder)

export default router
