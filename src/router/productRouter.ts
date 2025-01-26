import { Router } from 'express'
import productController from '../controller/productController'

const router = Router()

router.route('/product').post(productController.addProduct).get(productController.getAllProducts)

export default router
