const { CREDENTIALS: databaseCredentials } = require("../../util/DatabaseCredentials");
const PostgreSQLAdapter = require("../../util/PostgreSQLAdapter");
const ONE_MINUTE_IN_MS = 60_000;

module.exports = class BeforeEach {

    static async run() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = ONE_MINUTE_IN_MS;
        databaseCredentials.host = process.env.POSTGRES_HOST_TEST_ADDRESS;
        process.env.EMAIL_SENDER = '';

        const CLEAR_ALL_TABLES = `
            DELETE FROM account;
            DELETE FROM role;
            DELETE FROM permission;
            DELETE FROM account_role;
            DELETE FROM privilege;
        `;

        await PostgreSQLAdapter.executeQuery(CLEAR_ALL_TABLES);
    };
}
