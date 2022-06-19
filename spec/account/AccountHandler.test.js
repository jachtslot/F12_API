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
            const account = new Account(null, 'testUser', 'testUser@hotmail.com', 'Wachtwoord')
            await accountController.createAccount(account).then(data => {
                console.log(data)
            });

            const query = `INSERT INTO admin (account_id) VALUES ($1)`
            const values = [account.id];
            await PostgreSqlAdapter.executeQueryWithValues(query, values);
            // const event = JSON.stringify(
            //     {
            //         body: {
            //             email_address: account.emailAddress,
            //             hashed_password: account.hashedPassword,
            //             origin: process.env.PORTAL_ORIGIN
            //         }
            //     }
            // )
            const event = {
                email: account.emailAddress,
                password: account.hashedPassword,
                origin: process.env.PORTAL_ORIGIN
            }
            console.log(event.password)
            const credentials = await authenticationController.login(event);
        }
    );
})
