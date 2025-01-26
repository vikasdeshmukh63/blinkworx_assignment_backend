import { NextFunction, Request, Response } from 'express'
import responseMessage from '../constants/responseMessage'
import { Product, sequelize } from '../model'
import httpError from '../utils/httpError'
import httpResponse from '../utils/httpResponse'
import { CreateProductRequestBody } from '../types/types'

export default {
    // ! add new product
    addProduct: async (req: Request, res: Response, next: NextFunction) => {
        const transaction = await sequelize.transaction()

        try {
            const { productName, productDescription } = req.body as CreateProductRequestBody

            // validating the request
            if (!productName) {
                return httpError(next, new Error('Product name is required'), req, 400)
            }

            // creating product
            const product = await Product.create(
                {
                    productName,
                    productDescription
                },
                { transaction }
            )

            // commiting transaction
            await transaction.commit()

            return httpResponse(req, res, 200, responseMessage.SUCCESS, product)
        } catch (error) {
            // rollback if there is any error
            await transaction.rollback()
            return httpError(next, error, req, 500)
        }
    }
}
