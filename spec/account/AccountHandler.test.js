const Account = require('../../account/Account');
const BeforeEach = require('../support/BeforeEach');
const AccountHandler = require('../../account/AccountHandler');
const AccountController = require('../../account/AccountController');
const accountController = new AccountController();
const AuthenticationController = require('../../authentication/AuthenticationController');
const authenticationController = new AuthenticationController();
const PostgreSqlAdapter = require('../../util/PostgreSQLAdapter');


describe('testing the createAccount should check users role', () => {

    it('should create an account as an admin and create successfully', async () => {
            await BeforeEach.run();
            const account = new Account(null, 'testUser', 'testUser@hotmail.com', 'Wachtwoord');
            await accountController.createAccount(account).then(data => {
            });

            const query = `INSERT INTO admin (account_id) VALUES ($1)`
            const values = [account.id];
            await PostgreSqlAdapter.executeQueryWithValues(query, values);

            console.log(account)
            const loginEvent = {
                email: account.emailAddress,
                password: 'Wachtwoord',
                origin: process.env.PORTAL_ORIGIN
            }
            const credentials = await authenticationController.login(loginEvent);

            const createAccountEvent = JSON.stringify({

                headers: {
                    Authorization: `Bearer ${credentials.token}`
                },
                body: {
                    username: 'testUserNew',
                    email_address: 'testUserEmail@hotmail.com',
                    hashed_password: 'Test_User_Password'
                }

            });

            const result = await AccountHandler.createAccount(createAccountEvent);

        }
    );
})
