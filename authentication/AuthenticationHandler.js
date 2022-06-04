const AuthenticationController = require('./AuthenticationController');


module.exports.login = async event => {
    return await AuthenticationController.login(event);
}
