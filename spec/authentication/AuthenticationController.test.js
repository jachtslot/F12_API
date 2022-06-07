const {CREDENTIALS: databaseCredentials} = require('../../util/DatabaseCredentials');
const PostgreSQLAdapter = require('../../util/PostgreSQLAdapter');
const AccountController = require('../../account/AccountController');
const AuthenticationController = require('../../authentication/AuthenticationController')
const Account = require('../../account/Account');

const setUp = async () => {
    databaseCredentials.host = process.env.POSTGRES_HOST_TEST_ADDRESS;
    await PostgreSQLAdapter.clearAllTables();
    await AccountController.createAccount(getTestAccount());
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
        await setUp()
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
        await setUp();
        await expectAsync(AuthenticationController.login(
                {
                    email: getTestAccount().emailAddress,
                    password: 'incorrectPassword'
                }
            )
        ).toBeRejected();
    });

    it('should throw error when given non-existing emailaddress', async () => {
        await setUp();
        await expectAsync(AuthenticationController.login(
            {
                email: 'NonExistingEmail@hotmail.com',
                password: getTestAccount().hashedPassword
            }
        )).toBeRejected();
    });
});
