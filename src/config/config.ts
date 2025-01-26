import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

export default {
    // general
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,

    // database
    DATABASE: process.env.DATABASE_URL
}
