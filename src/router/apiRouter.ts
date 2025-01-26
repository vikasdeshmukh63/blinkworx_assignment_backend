import { Router } from 'express'
import healthController from '../controller/healthController'

const router = Router()

router.route('/health').get(healthController.health)

export default router
