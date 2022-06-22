const { Pool } = require('pg');
const databaseCredentials = require('./DatabaseCredentials').CREDENTIALS

module.exports = class PostgreSQLAdapter {

    static pool = new Pool(databaseCredentials);

    static async executeQueryWithValues(query, values) {
        const response = await this.pool.query(query, values);
        return response.rows;
    }

    static async executeQuery(query) {
        const response = await this.pool.query(query);
        return response.rows;
    }
}
