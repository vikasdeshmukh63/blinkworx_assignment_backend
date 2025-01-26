import app from './app'
import config from './config/config'
import logger from './utils/logger'

const server = app.listen(config.PORT)

// funtion to handle operation before starting of server
;void (() => {
    try {
        // database connection
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

            process.exit(1)
        })
    }
})()
