const AccountController = require('./AccountController');
const accountController = new AccountController();
const Account = require('./Account');
const AuthenticationHelper = require('../util/AuthenticationHelper');

const ResponseFactory = require('../response/ResponseFactory');
const Methods = require('../response/methods').Methods;

module.exports.createAccount = async event => {
    const decodedToken = AuthenticationHelper.verifyToken(event);
    if (decodedToken.role !== 'admin') {
        throw new Error('User unauthorized for this function.');
    }
    const responseBody = JSON.parse(event.body);
    const username = responseBody.username;
    const email = responseBody.email_address;
    const password = responseBody.hashed_password;
    const unhashedAccount = new Account(null, username, email, password);

    const account = await accountController.createAccount(unhashedAccount);
    const body = JSON.stringify({
        'id': account.id,
        'username': account.username,
        'email_address': account.emailAddress
    });
    return ResponseFactory.build(
        201,
        Methods.POST,
        body
    );
}

module.exports.deleteAccount = async event => {
    let responseBody = JSON.parse(event.body);
    let emailAddress = responseBody.email_address;

    let deletedEmailAddress = await accountController.deleteAccount(emailAddress);
    return ResponseFactory.build(
        200,
        Methods.DELETE,
        `Account with email address ${deletedEmailAddress} is deleted!`
    );
}

module.exports.getAllAccounts = async () => {
    const accounts = await accountController.getAllAccounts();
    return ResponseFactory.build(
        200,
        Methods.GET,
        JSON.stringify(accounts)
    );
}

module.exports.getAccount = async event => {
    let id = event.pathParameters.id;
    let retrievedAccount = await accountController.getAccount(id);

    return await accountController.getAccount(id).then(account => {

        if (account.length <= 0) {
            return ResponseFactory.build(
                404,
                Methods.GET,
                `The Account with id: '${id}' was not found.`
            );
        }

        return ResponseFactory.build(
            200,
            Methods.GET,
            JSON.stringify(retrievedAccount[0])
        );
    });
}
