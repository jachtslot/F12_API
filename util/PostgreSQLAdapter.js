const { Pool } = require('pg');
const databaseCredentials = require('./DatabaseCredentials').CREDENTIALS

module.exports = class PostgreSQLAdapter {

    static async executeQuery({query, values}) {
        const pool = new Pool(databaseCredentials);
        return await pool.query(query, values);
    }
}
