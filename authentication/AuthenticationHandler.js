const AuthenticationController = require('./AuthenticationController');


module.exports.login = async event => {
    return await AuthenticationController.login(event).then(data => {
        const loadedAccount = data.loadedAccount;
        const token = data.token;

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "http://localhost:4200",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
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
