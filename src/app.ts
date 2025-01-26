import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import router from './router/index'
import responseMessage from './constants/responseMessage'
import httpError from './utils/httpError'
import globalErrorHandler from './middleware/globalErrorHandler'

const app: Application = express()

// to secure the app by setting various http headers
app.use(helmet())
// to allow cross origin requests
app.use(
    cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        origin: '*', // allow all origins,
        credentials: true // allow cookies to be sent
    })
)

//middilware to get the req bodyh in json format
app.use(express.json())

// routes
app.use('/api/v1', router)

// 404 erro handler
app.use((req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(responseMessage.NOT_FOUND('Route'))
    } catch (error) {
        httpError(next, error, req, 404)
    }
})

// global error handler
app.use(globalErrorHandler)

export default app
