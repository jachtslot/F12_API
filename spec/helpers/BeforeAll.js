const ONE_MINUTE_IN_MS = 60_000;

beforeAll(async () => {
    const fs = require('fs'),
        path = require('path'),
        filePath = path.join(__dirname, 'f12.sql');

    console.log('setting up database');
    jasmine.DEFAULT_TIMEOUT_INTERVAL = ONE_MINUTE_IN_MS;
    process.env.EMAIL_SENDER = '';
    const { CREDENTIALS: databaseCredentials } = require("../../util/DatabaseCredentials");
    databaseCredentials.database = process.env.POSTGRES_TEST_DATABASE;
    const PostgreSQLAdapter = require("../../util/PostgreSQLAdapter");
    const DATABASE_INIT = fs.readFileSync(filePath).toString();
    await PostgreSQLAdapter.executeQuery(DATABASE_INIT);
});
