import app from './app'
import config from './config/config'
import logger from './utils/logger'
import databaseService from './services/dbServices'
import { sequelize } from './model'

const server = app.listen(config.PORT)

// function to handle operation before starting of server
void (async () => {
    try {
        // database connection
        const connection = await databaseService.connect()
        logger.info(`DATABASE CONNECTED`, {
            meta: {
                CONNECTION_NAME: connection.getDatabaseName()
            }
        })

        // syncing all models with database
        await sequelize.sync({ force: false })
        logger.info('DATABASE MODELS SYNCED')

        logger.info(`APPLICATION STARTED`, {
            meta: {
                PORT: config.PORT,
                SERVER_URL: config.SERVER_URL
            }
        })
    } catch (err) {
        logger.error(`APPLICATION ERROR`, {
            meta: {
                err
            }
        })

        server.close((error) => {
            if (error) {
                logger.error(`APPLICATION ERROR`, { meta: error })
            }
        })
    }
})()
