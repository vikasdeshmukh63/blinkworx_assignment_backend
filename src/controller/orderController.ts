import { NextFunction, Request, Response } from 'express'
import responseMessage from '../constants/responseMessage'
import { Order, Product, sequelize } from '../model'
import { CreateOrderRequestBody } from '../types/types'
import httpError from '../utils/httpError'
import httpResponse from '../utils/httpResponse'
import { Op } from 'sequelize'

export default {
    // ! add new order
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

                return httpResponse(req, res, 200, responseMessage.SUCCESS, orderWithProducts)
            }
        } catch (error) {
            // rollback if there is any error
            await transaction.rollback()
            return httpError(next, error, req, 500)
        }
    },

    // ! get order by id
    getOrderById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const order = await Order.findByPk(req.params.id, {
                include: [{ model: Product, as: 'products' }]
            })

            if (!order) {
                return httpError(next, new Error('order not found'), req, 404)
            }

            return httpResponse(req, res, 200, responseMessage.SUCCESS, order)
        } catch (error) {
            return httpError(next, error, req, 500)
        }
    },

    // ! get all orders
    getAllOrders: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orders = await Order.findAll({
                include: [{ model: Product, as: 'products' }]
            })

            return httpResponse(req, res, 200, responseMessage.SUCCESS, orders)
        } catch (error) {
            return httpError(next, error, req, 500)
        }
    },

    // ! update order
    updateOrder: async (req: Request, res: Response, next: NextFunction) => {
        const transaction = await sequelize.transaction()

        try {
            const { orderDescription, productIds } = req.body as CreateOrderRequestBody
            const orderId = req.params.id

            const order = await Order.findByPk(orderId, { transaction })

            if (!order) {
                await transaction.rollback()
                return httpError(next, new Error('order not found'), req, 404)
            }

            if (orderDescription) {
                await order.update({ orderDescription }, { transaction })
            }

            if (productIds && Array.isArray(productIds)) {
                const products = await Product.findAll({
                    where: {
                        id: productIds
                    },
                    transaction
                })

                if (products.length !== productIds.length) {
                    await transaction.rollback()
                    return httpError(next, new Error('one or more product id is invalid'), req, 400)
                }

                await order.setProducts(products, { transaction })
            }

            const updatedOrder = await Order.findByPk(orderId, {
                include: [{ model: Product, as: 'products' }],
                transaction
            })

            await transaction.commit()

            return httpResponse(req, res, 200, responseMessage.SUCCESS, updatedOrder)
        } catch (error) {
            await transaction.rollback()
            return httpError(next, error, req, 500)
        }
    },

    // ! delete order
    deleteOrder: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orderId = req.params.id

            const order = await Order.findByPk(orderId)

            if (!order) {
                return httpError(next, new Error('order not found'), req, 404)
            }

            await order.destroy()

            return httpResponse(req, res, 200, responseMessage.SUCCESS, null)
        } catch (error) {
            httpError(next, error, req, 500)
        }
    },

    // ! search orders
    searchOrders: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { query } = req.query

            // Validate the query parameter
            if (!query) {
                return httpError(next, new Error('Query parameter is required'), req, 400)
            }

            const isNumericQuery = !isNaN(Number(query))

            const whereClause = {
                [Op.or]: [...(isNumericQuery ? [{ id: Number(query) }] : []), { orderDescription: { [Op.iLike]: `%${query as string}%` } }]
            }

            const orders = await Order.findAll({
                where: whereClause,
                include: [{ model: Product, as: 'products' }]
            })

            return httpResponse(req, res, 200, responseMessage.SUCCESS, orders)
        } catch (error) {
            return httpError(next, error, req, 500)
        }
    }
}
