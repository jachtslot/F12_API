const AuthenticationController = require('./AuthenticationController');
const authenticationController = new AuthenticationController();
const AuthenticationHelper = require('../util/AuthenticationHelper');

const ResponseFactory = require('../response/ResponseFactory');
const Methods = require('../response/methods').Methods;

module.exports.login = async event => {
    const credentials = AuthenticationHelper.parseBody(event);

    let data = await authenticationController.login(credentials);

    const loadedAccount = data.loadedAccount;
    const token = data.token;
    const body = JSON.stringify(
        {
            token: token,
            id: loadedAccount.id,
            email_address: loadedAccount.emailAddress,
            username: loadedAccount.username
        }
    );

    return ResponseFactory.build(
        200,
        Methods.POST,
        body
    );
}
