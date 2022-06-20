const {v4: uuidv4} = require('uuid');
const AccountController = require('../../account/AccountController');
const accountController = new AccountController();
const Account = require('../../account/Account');
const BeforeEach = require('../support/BeforeEach');

const ValidationError = require('../../account/ValidationError');
const AccountNotFoundError = require('../../account/AccountNotFoundError');

const createTestAccount = () => {
    return new Account(
        null,
        'dave',
        's1127893@student.hsleiden.nl',
        'Password'
    );
}


describe('testing the createAccount() method of the AccountController', () => {

    it('should create an account successfully', async () => {
        await BeforeEach.run();
        let accountRecords = await accountController.createAccount(createTestAccount());
        expect(accountRecords.id.length > 0).toBeTrue();

    });

    it('should throw an error when email already exists', async () => {
        await BeforeEach.run();
        await accountController.createAccount(createTestAccount());
        await expectAsync(accountController.createAccount(createTestAccount())).toBeRejected();
    });
});

describe('testing the changePassword() method of the AccountController', () => {

    it('should update password when correct password given', async () => {
        await BeforeEach.run();
        let createdAccount = await accountController.createAccount(createTestAccount());
        await expectAsync(
            accountController.changePassword(createdAccount, 'Password', 'newpassword')
        ).toBeResolved();
    });

    it('should have different password when updated', async () => {
        await BeforeEach.run();
        let createdAccount = await accountController.createAccount(createTestAccount());
        await expectAsync(
            accountController.changePassword(createdAccount, 'Password', 'newpassword')
        ).toBeResolved();
        let updatedAccount = await accountController.getAccountWithPassword(createdAccount.id);
        await expectAsync(
            accountController.changePassword(updatedAccount, 'Password', 'newpassword')
        ).toBeRejectedWith(new ValidationError('old password is not correct'));
        let notUpdatedAccount = await accountController.getAccountWithPassword(updatedAccount.id);
        await expectAsync(
            accountController.changePassword(notUpdatedAccount, 'newpassword', 'yetanother')
        ).toBeResolved();
    });

    it('should throw an error when password has lowercase difference', async () => {
        await BeforeEach.run();
        let createdAccount = await accountController.createAccount(createTestAccount());
        await expectAsync(
            accountController.changePassword(createdAccount, 'password', 'newpassword')
        ).toBeRejectedWith(new ValidationError('old password is not correct'));
    });

    it('should throw an error when password does not match at all', async () => {
        await BeforeEach.run();
        let createdAccount = await accountController.createAccount(createTestAccount());
        await expectAsync(
            accountController.changePassword(createdAccount, 'completelywrong', 'newpassword')
        ).toBeRejectedWith(new ValidationError('old password is not correct'));
    });

    it('should throw an error when account not found', async () => {
        await BeforeEach.run();
        let createdAccount = await accountController.createAccount(createTestAccount());
        createdAccount.id = uuidv4();
        await expectAsync(
            accountController.changePassword(createdAccount, 'Password', 'newpassword')
        ).toBeRejectedWith(new AccountNotFoundError('account not found in database'));
    });
});

describe('testing the changeAccountName() method of the AccountController', () => {

    it('should update account name when correct id found in JWT', async () => {
        await BeforeEach.run();
        let createdAccount = await accountController.createAccount(createTestAccount());
        await expectAsync(
            accountController.changeAccountName(createdAccount.id, 'newname')
        ).toBeResolved();
    });

    it('should throw an error when id not found in database', async () => {
        await BeforeEach.run();
        let createdAccount = await accountController.createAccount(createTestAccount());
        await expectAsync(
            accountController.changeAccountName(uuidv4(), 'newname')
        ).toBeResolved();
    });

    it('should throw an error when new id name is empty', async () => {
        await BeforeEach.run();
        let createdAccount = await accountController.createAccount(createTestAccount());
        await expectAsync(
            accountController.changeAccountName(createdAccount.id, '')
        ).toBeResolved();
    });
});
