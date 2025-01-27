import { Sequelize } from 'sequelize'
import config from '../config/config'
import logger from '../utils/logger'

// ! database connection
export const sequelize = new Sequelize(config.DATABASE as string, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions:
        config.DATABASE_SSL === 'true'
            ? {
                  ssl: {
                      require: true,
                      rejectUnauthorized: false
                  }
              }
            : undefined,
    logging: (msg) => logger.info(msg)
})

// ! database services
export default {
    connect: async () => {
        try {
            await sequelize.authenticate()
            return sequelize
        } catch (error) {
            logger.error(`DATABASE CONNECTION ERROR`, {
                meta: error
            })
            throw error
        }
    },
    disconnect: async () => {
        try {
            await sequelize.close()
        } catch (error) {
            logger.error(`DATABASE DISCONNECTION ERROR`, {
                meta: error
            })
            throw error
        }
    }
}
