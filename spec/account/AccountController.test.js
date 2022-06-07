const databaseCredentials = require('../../util/DatabaseCredentials').CREDENTIALS;
const AccountController = require('../../account/AccountController');
const PostgreSQLAdapter = require('../../util/PostgreSQLAdapter');
const Account = require('../../account/Account')

const setUp = async () => {
    databaseCredentials.host = process.env.POSTGRES_HOST_TEST_ADDRESS;
    await PostgreSQLAdapter.clearAllTables();
};
const getTestAccount = () => {
    return new Account(
        'testUsername',
        's1127893@student.hsleiden.nl',
        'testPassword'
    )
}

describe('testing the createAccount() method from the AccountController', () => {

    it('overwrites the databaseCredentials host', async () => {
        await setUp();
        expect(databaseCredentials.host).toBe(process.env.POSTGRES_HOST_TEST_ADDRESS);
    });

    it('should create an account successfully', async () => {
        await setUp();
        const account = getTestAccount();

        let accountRecords = await AccountController.createAccount(account);
        expect(accountRecords.id.length > 0).toBeTrue();

    })

    it('should throw an error when email already exists', async () => {
        await setUp();
        let testAccount = getTestAccount();
        await AccountController.createAccount(testAccount);
        await expectAsync(AccountController.createAccount(testAccount)).toBeRejected();
    })
})
