const databaseCredentials = require('../../../util/DatabaseCredentials').CREDENTIALS

describe("basic test", () => {

    beforeEach(() => {
        databaseCredentials.host = process.env.POSTGRES_HOST_TEST_ADDRESS;
    });

    it("works", () => {
        expect(databaseCredentials.host).toBe(process.env.POSTGRES_HOST_TEST_ADDRESS);
    });
});
