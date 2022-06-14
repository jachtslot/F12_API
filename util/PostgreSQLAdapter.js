const { Pool } = require('pg');
const databaseCredentials = require('./DatabaseCredentials').CREDENTIALS

module.exports = class PostgreSQLAdapter {

    static async executeQueryWithValues(query, values) {
        const pool = new Pool(databaseCredentials);
        return await pool.query(query, values).then(data => {
            return data.rows;
        });
    }

    static async executeQuery(query) {
        const pool = new Pool(databaseCredentials);
        return await pool.query(query).then(data => {
            return data.rows;
        });
    }
}
