require('dotenv').config();

module.exports = class DatabaseCredentials {

    static CREDENTIALS = {
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST_ADDRESS,
        database: process.env.POSTGRES_DATABASE,
        password: process.env.POSTGRES_PASSWORD,
        port: process.env.POSTGRES_PORT
    }
}
