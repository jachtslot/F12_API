const { Pool } = require('pg');
const databaseCredentials = require('./DatabaseCredentials').CREDENTIALS

module.exports = class PostgreSQLAdapter {

    static async executeQueryWithValues({query, values}) {
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

    // !!!! use this method only for testing, it will clear all the data in the database !!!!
    static clearAllTables() {
        const query = `
            DELETE FROM account;
            DELETE FROM role;
            DELETE FROM permission;
        `;

        return this.executeQuery(query);
    }

    static async executeQuery(query) {
        const pool = new Pool(databaseCredentials);
        return await pool.query(query);
    }
}
