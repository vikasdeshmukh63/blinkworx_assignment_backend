import express from 'express'
import healthRouter from '../router/healthRouter'
import orderRouter from '../router/orderRouter'

const router = express.Router()

router.use(orderRouter)
router.use(healthRouter)

export default router
