const AccountController = require('./AccountController');
const accountController = new AccountController();
const Account = require('./Account');
const AuthenticationHelper = require('../util/AuthenticationHelper');

const ResponseFactory = require('../response/ResponseFactory');
const Methods = require('../response/methods').Methods;

const ValidationError = require('./ValidationError');
const AccountNotFoundError = require('./AccountNotFoundError');
const InvalidAccountNameError = require('./InvalidAccountNameError');
const UnauthorizedUserError = require('../authentication/UnauthorizedUserError');
const SimpleEmailServiceError = require('./SimpleEmailServiceError');

module.exports.createAccount = async event => {
    if (!AuthenticationHelper.hasAdminRole(event)) {
        throw new UnauthorizedUserError('User is not authenticated for this action');
    }

    event = JSON.parse(event);
    const responseBody = event.body;
    const username = responseBody.username;
    const email = responseBody.email_address;
    const password = responseBody.hashed_password;
    const unhashedAccount = new Account(null, username, email, password);

    try {
        const account = await accountController.createAccount(unhashedAccount)
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
    } catch (error) {
        if (error instanceof SimpleEmailServiceError) {
            return ResponseFactory.build(
                500,
                Methods.POST,
                `Something went wrong sending the registration mail to ${email}`
            );
        }
        return ResponseFactory.build(
            500,
            Methods.POST,
            JSON.stringify(error.message)
        );
    }
}

module.exports.changePassword = async event => {
    let responseBody = JSON.parse(event.body);
    let id = event.pathParameters.id;
    let old_password = responseBody.old_password;
    let new_password = responseBody.new_password;

    try {
        await accountController.changePassword(
            await accountController.getAccountWithPassword(id),
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

module.exports.changeAccountName = async event => {
    let decodedToken = AuthenticationHelper.verifyToken(event);
    let accountId = decodedToken.id;
    let responseBody = JSON.parse(event.body);
    let newName = responseBody.new_name;

    try {
        await accountController.changeAccountName(accountId, newName);

        return ResponseFactory.build(
            200,
            Methods.PUT,
            `accountName has been updated to ${newName}`
        )
    } catch (error) {
        if (error instanceof AccountNotFoundError) {
            return ResponseFactory.build(
                404,
                Methods.PUT,
                `account with id ${accountId} is not found`
            )
        }

        if (error instanceof InvalidAccountNameError) {
            return ResponseFactory.build(
                403,
                Methods.PUT
                `new accountName cannot be undefined, null or be of length 0`
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
