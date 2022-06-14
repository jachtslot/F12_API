const AccountController = require('./AccountController');
const accountController = new AccountController();
const Account = require('./Account');
const ResponseFactory = require('../response/ResponseFactory');
const Methods = require('../response/methods').Methods;

module.exports.createAccount = async event => {
    const responseBody = JSON.parse(event.body);
    const username = responseBody.username;
    const email = responseBody.email_address;
    const password = responseBody.hashed_password;
    const unhashedAccount = new Account(null, username, email, password);

    let account = accountController.createAccount(unhashedAccount);
    let body = JSON.stringify({
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
    return await accountController.getAccount(id).then(account => {

        if (account.length <= 0) {
            return {
                statusCode: 404,
                body: `The Account with id: '${id}' was not found.`
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify(account[0])
        }
    });
}
