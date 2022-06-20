const BeforeEach = require('../support/BeforeEach');
const AccountHandler = require('../../account/AccountHandler');
const AuthenticationHelper = require('../helpers/AuthenticationHelper');
const EventMocker = require('../helpers/EventMocker');



const createAccountBody = async () => {
    return  {
        username: 'testUserNew',
        email_address: 'testUserEmail@hotmail.com',
        hashed_password: 'Test_User_Password'
    };
}

describe('testing the createAccount should check users role', () => {

    it('should create an account as an admin and create successfully', async () => {
            await BeforeEach.run();
            const isAdmin = true;
            const account = await AuthenticationHelper.createTestAccount(isAdmin);
            const credentials = await AuthenticationHelper.getJwtToken(account, process.env.PORTAL_ORIGIN);
            const mockEvent = EventMocker.buildWithAuthHeadersAndBody(credentials.token, createAccountBody())
            await expectAsync(AccountHandler.createAccount(mockEvent)).toBeResolved();
        }
    );

    it('should fail creating an account as a normal user', async () => {
        await BeforeEach.run();
        const isAdmin = false;
        const account = await AuthenticationHelper.createTestAccount(isAdmin);
        const credentials = await AuthenticationHelper.getJwtToken(account, process.env.APP_ORIGIN);
        const mockEvent = EventMocker.buildWithAuthHeadersAndBody(credentials.token, createAccountBody())
        await expectAsync(AccountHandler.createAccount(mockEvent)).toBeRejected();
    });
})
