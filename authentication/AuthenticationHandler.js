const AuthenticationController = require('./AuthenticationController');
const AuthenticationHelper = require('../util/AuthenticationHelper');


module.exports.login = async event => {
    const credentials = AuthenticationHelper.parseBody(event);
    return await AuthenticationController.login(credentials).then(data => {
        const loadedAccount = data.loadedAccount;
        const token = data.token;

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "http://localhost:4200",
                "Access-Control-Allow-Methods": "OPTIONS,POST"
            },
            body: JSON.stringify(
                {
                    token: token,
                    id: loadedAccount.id,
                    email_address: loadedAccount.emailAddress,
                    username: loadedAccount.username
                })
        }
    }).catch(error => {
        return {
            statusCode: 500,
            body: error.message
        }
    });
}
