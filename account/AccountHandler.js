const AccountController = require('./AccountController');
const accountController = new AccountController();
const Account = require('./Account');

const ResponseFactory = require('../response/ResponseFactory');
const Methods = require('../response/methods').Methods;

const ValidationError = require('./ValidationError');
const AccountNotFoundError = require('./AccountNotFoundError');

module.exports.createAccount = async event => {
    const responseBody = JSON.parse(event.body);
    const username = responseBody.username;
    const email = responseBody.email_address;
    const password = responseBody.hashed_password;
    const unhashedAccount = new Account(null, username, email, password);

    let account = await accountController.createAccount(unhashedAccount);
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

module.exports.changePassword = async event => {
    let responseBody = JSON.parse(event.body);
    let id = event.pathParameters.id;
    let old_password = responseBody.old_password;
    let new_password = responseBody.new_password;

    try {
        await accountController.changePassword(
            accountController.getAccountWithPassword(id),
            old_password, new_password
        );
        return ResponseFactory.build(
            200,
            Methods.PUT,
            `password has been updated`
        );
    } catch (error) {
        if (error instanceof ValidationError) {
            return ResponseFactory.build(
                403,
                Methods.PUT,
                `invalid password for account with id: ${id}`
            );
        }
        if (error instanceof AccountNotFoundError) {
            return ResponseFactory.build(
                404,
                Methods.PUT,
                `account with id ${id} is not found`
            );
        }
    }
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
