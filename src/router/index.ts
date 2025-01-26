import express from 'express'
import healthRouter from '../router/healthRouter'
import orderRouter from '../router/orderRouter'
import productRouter from '../router/productRouter'

const router = express.Router()

router.use(orderRouter)
router.use(healthRouter)
router.use(productRouter)

export default router
