const { CREDENTIALS: databaseCredentials } = require("../../util/DatabaseCredentials");
const PostgreSQLAdapter = require("../../util/PostgreSQLAdapter");

module.exports = class BeforeEach {

    static async run() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
        databaseCredentials.host = process.env.POSTGRES_HOST_TEST_ADDRESS;
        process.env.EMAIL_SENDER = '';
        await PostgreSQLAdapter.clearAllTables();
    };
}
