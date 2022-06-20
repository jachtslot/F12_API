const AccountController = require('../../account/AccountController');
const accountController = new AccountController();
const Account = require('../../account/Account');
const BeforeEach = require('../support/BeforeEach');

const testAccount = new Account(
    null,
    'dave',
    's1127893@student.hsleiden.nl',
    'Password'
);

describe('testing the createAccount() method of the AccountController', () => {

    it('should create an account successfully', async () => {
        await BeforeEach.run();
        let accountRecords = await accountController.createAccount(testAccount);
        expect(accountRecords.id.length > 0).toBeTrue();

    });

    it('should throw an error when email already exists', async () => {
        await BeforeEach.run();
        await accountController.createAccount(testAccount);
        await expectAsync(accountController.createAccount(testAccount)).toBeRejected();
    });
});

describe('testing the changeAccount() method of the AccountController', () => {

    it('should create an account successfully', async () => {
        await BeforeEach.run();
        let createdAccount = await accountController.createAccount(testAccount);
        await expectAsync(
            accountController.changePassword(createdAccount, 'Password', 'newpassword')
        ).toBeResolved();
    });

    it('should throw an error when email already exists', async () => {

    });
});