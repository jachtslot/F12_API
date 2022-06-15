const AccountController = require('../../account/AccountController');
const accountController = new AccountController();
const AuthenticationController = require('../../authentication/AuthenticationController');
const authenticationController = new AuthenticationController();
const Account = require('../../account/Account');
const PostgresqlAdapter = require('../../util/PostgreSQLAdapter');
const BeforeEach = require('../support/BeforeEach');

const beforeEach = async () => {
    await BeforeEach.run();
    const testAdmin = getTestAdmin();
    await accountController.createAccount(testAdmin);
    await PostgresqlAdapter.executeQueryWithValues('INSERT INTO admin (account_id) VALUES($1)', [testAdmin.id]);
    await accountController.createAccount(getTestUser());

}

const getTestAdmin = () => {
    return new Account(
        null,
        'Wachtwoord',
        'originelemail@hotmail.com',
        'Wachtwoord'
    )
}
const getTestUser = () => {
    return new Account(
        null,
        'Wachtwoord',
        'originelemail2@hotmail.com',
        'Wachtwoord'
    )
}

describe('testing the login() method of the AuthenticationController', () => {

    it('should return an object with access_token on successful login to web portal with admin account',
        async () => {
            await beforeEach();
            const result = await authenticationController.login(
                {
                    email: getTestAdmin().emailAddress,
                    password: getTestAdmin().hashedPassword,
                    origin: process.env.PORTAL_ORIGIN
                }
            )
            expect(result.loadedAccount.username).toBe(getTestAdmin().username);
            expect(result.token.length).toBeGreaterThan(1);
        });

    it('should throw error when given incorrect password', async () => {
        await beforeEach();
        await expectAsync(authenticationController.login(
            {
                email: getTestAdmin().emailAddress,
                password: 'incorrectPassword',
                origin: process.env.PORTAL_ORIGIN

            }
        )).toBeRejected();
    });

    it('should throw error when given non-existing emailaddress', async () => {
        await beforeEach();
        await expectAsync(authenticationController.login(
            {
                email: 'NonExistingEmail@hotmail.com',
                password: getTestAdmin().hashedPassword,
                origin: process.env.PORTAL_ORIGIN
            }
        )).toBeRejected();
    });

    it('should throw error when logging in to web portal as mobile account', async () => {
        await beforeEach();
        await expectAsync(authenticationController.login({
                email: getTestUser().emailAddress,
                password: getTestUser().hashedPassword,
                origin: process.env.PORTAL_ORIGIN
            }
        )).toBeRejected();
    });
    it('should return an access token when logging to mobile app as admin', async () => {
        await beforeEach();
        await expectAsync(authenticationController.login({
            email: getTestAdmin().emailAddress,
            password: getTestAdmin().hashedPassword,
            origin: process.env.APP_ORIGIN
        })).toBeResolved();

    });
});
