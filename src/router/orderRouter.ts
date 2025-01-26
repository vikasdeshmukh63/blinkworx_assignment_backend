import { Router } from 'express'
import orderController from '../controller/orderController'

const router = Router()

router.route('/order').post(orderController.addNeworder).get(orderController.getAllOrders)

router.route('/orders/search').get(orderController.searchOrders)

router.route('/orders/:id').get(orderController.getOrderById).put(orderController.updateOrder).delete(orderController.deleteOrder)

export default router
