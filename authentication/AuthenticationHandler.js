const AuthenticationController = require('./AuthenticationController');
const authenticationController = new AuthenticationController();
const AuthenticationHelper = require('../util/AuthenticationHelper');

const ResponseFactory = require('../response/ResponseFactory');
const InvalidCredentialsError = require('./InvalidCredentialsError');
const InvalidRoleError = require('./InvalidRoleError');
const AccountNotFoundError = require('../account/AccountNotFoundError');
const Methods = require('../response/methods').Methods;

module.exports.login = async event => {
    const credentials = AuthenticationHelper.parseBody(event);

    return await authenticationController.login(credentials).then(data => {
        const loadedAccount = data.loadedAccount;
        const token = data.token;
        const body = {
            token: token,
            id: loadedAccount.id,
            email_address: loadedAccount.emailAddress,
            username: loadedAccount.username
        };
        return ResponseFactory.build(
            200,
            Methods.POST,
            body
        );
    }).catch(error => {
        if (error instanceof InvalidCredentialsError) {
            return ResponseFactory.build(403, Methods.POST, error.message);
        }
        if (error instanceof InvalidRoleError) {
            return ResponseFactory.build(403, Methods.POST, 'User is not authorized for this page.');
        }
        if (error instanceof AccountNotFoundError) {
            return ResponseFactory.build(403, Methods.POST, error.message);
        }
        return ResponseFactory.build(500, Methods.POST, error.message);
    });


}
