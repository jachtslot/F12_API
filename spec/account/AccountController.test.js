const databaseCredentials = require('../../util/DatabaseCredentials').CREDENTIALS;
const AccountController = require('../../account/AccountController');
const Account = require('../../account/Account');
const BeforeEach = require('../support/BeforeEach');

const getTestAccount = () => {
    return new Account(
        null,
        'dave',
        's1127893@student.hsleiden.nl',
        'Password'
    )
}

describe('testing the createAccount() method of the AccountController', () => {

    it('overwrites the databaseCredentials host', async () => {
        await BeforeEach.run();
        expect(databaseCredentials.host).toBe(process.env.POSTGRES_HOST_TEST_ADDRESS);
    });

    it('should create an account successfully', async () => {
        await BeforeEach.run();
        const account = getTestAccount();

        let accountRecords = await AccountController.createAccount(account);
        expect(accountRecords.id.length > 0).toBeTrue();

    })

    it('should throw an error when email already exists', async () => {
        await BeforeEach.run();
        let testAccount = getTestAccount();
        await AccountController.createAccount(testAccount);
        await expectAsync(AccountController.createAccount(testAccount)).toBeRejected();
    })
})
