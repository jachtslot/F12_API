const ONE_MINUTE_IN_MS = 60_000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = ONE_MINUTE_IN_MS;
const { Pool } = require('pg');

beforeAll(async () => {
    const fs = require('fs'),
        path = require('path'),
        filePath = path.join(__dirname, 'f12.sql');

    jasmine.DEFAULT_TIMEOUT_INTERVAL = ONE_MINUTE_IN_MS;
    process.env.EMAIL_SENDER = '';
    const { CREDENTIALS: databaseCredentials } = require("../../util/DatabaseCredentials");
    databaseCredentials.database = process.env.POSTGRES_TEST_DATABASE;
    const PostgreSQLAdapter = require("../../util/PostgreSQLAdapter");
    PostgreSQLAdapter.pool = new Pool(databaseCredentials);
    const DATABASE_INIT = fs.readFileSync(filePath).toString();
    await PostgreSQLAdapter.executeQuery(DATABASE_INIT);
});
