const AccountController = require('./AccountController');

module.exports.createAccount = async event => {
    let responseBody = JSON.parse(event.body);

    return await AccountController.createAccount(responseBody).then(() => {
        return {
            statusCode: 200,
            body: 'A new Account is created'
        };
    }).catch(error => {
        return {
            statusCode: 500,
            body: error.message
        }
    });
}
