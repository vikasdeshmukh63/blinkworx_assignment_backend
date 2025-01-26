import { NextFunction, Request, Response } from 'express'
import responseMessage from '../constants/responseMessage'
import { Order, Product, sequelize } from '../model'
import { CreateOrderRequestBody } from '../types/types'
import httpError from '../utils/httpError'
import httpResponse from '../utils/httpResponse'

export default {
    addNeworder: async (req: Request, res: Response, next: NextFunction) => {
        // starting transaction
        const transaction = await sequelize.transaction()

        try {
            const { orderDescription, productIds } = req.body as CreateOrderRequestBody

            // vallidating the request
            if (!orderDescription || !productIds) {
                return httpError(next, new Error('orderDescription and productId are required'), req, 400)
            }

            // creating order
            const order = await Order.create(
                {
                    orderDescription,
                    createdAt: new Date()
                },
                { transaction }
            )

            if (productIds.length > 0) {
                // cheching that the product ids are present in db or not
                const products = await Product.findAll({
                    where: {
                        id: productIds
                    },
                    transaction
                })

                if (productIds.length !== products.length) {
                    await transaction.rollback()
                    return httpError(next, new Error('one or more product id is invalid'), req, 400)
                }

                // adding products to the order
                await order.addProducts(products, { transaction })

                // geting created order along with its products
                const orderWithProducts = await Order.findByPk(order.id, {
                    include: [{ model: Product, as: 'products' }],
                    transaction
                })

                // commiting transaction
                await transaction.commit()

                httpResponse(req, res, 200, responseMessage.SUCCESS, orderWithProducts)
            }
        } catch (error) {
            // rollback if there is any error
            await transaction.rollback()
            httpError(next, error, req, 500)
        }
    }
}
