const AccountController = require('../../account/AccountController');
const accountController = new AccountController();
const AuthenticationController = require('../../authentication/AuthenticationController')
const Account = require('../../account/Account');
const BeforeEach = require('../support/BeforeEach');

const beforeEach = async () => {
    await BeforeEach.run();
    await accountController.createAccount(getTestAccount());
}

const getTestAccount = () => {
    return new Account(
        null,
        'dave',
        's1127893@student.hsleiden.nl',
        'Password'
    )
}

describe('testing the login() method of the AuthenticationController', () => {

    it('should return an object with user and access_token on successful login', async () => {
        await beforeEach()
        const result = await AuthenticationController.login(
            {
                email: getTestAccount().emailAddress,
                password: getTestAccount().hashedPassword
            }
        )
        expect(result.loadedAccount.username).toBe(getTestAccount().username);
        expect(result.token.length).toBeGreaterThan(1);
    });

    it('should throw error when given incorrect password', async () => {
        await beforeEach();
        await expectAsync(AuthenticationController.login(
            {
                email: getTestAccount().emailAddress,
                password: 'incorrectPassword'
            }
        )).toBeRejected();
    });

    it('should throw error when given non-existing emailaddress', async () => {
        await beforeEach();
        await expectAsync(AuthenticationController.login(
            {
                email: 'NonExistingEmail@hotmail.com',
                password: getTestAccount().hashedPassword
            }
        )).toBeRejected();
    });
});
