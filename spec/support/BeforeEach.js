const { CREDENTIALS: databaseCredentials } = require("../../util/DatabaseCredentials");
const PostgreSQLAdapter = require("../../util/PostgreSQLAdapter");
const ONE_MINUTE_IN_MS = 60_000;

module.exports = class BeforeEach {

    static async run() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = ONE_MINUTE_IN_MS;
        databaseCredentials.host = process.env.POSTGRES_HOST_TEST_ADDRESS;
        process.env.EMAIL_SENDER = '';
        await PostgreSQLAdapter.clearAllTables();
    };
}
