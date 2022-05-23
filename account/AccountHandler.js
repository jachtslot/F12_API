const axios = require('axios');
const AccountController = require('./AccountController');

module.exports.createAccount = async event => {

    AccountController.createAccount().then(response => {
        return {
            statusCode: 200,
            body: JSON.stringify(
                response
            )
        }
    }).catch(error => {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: `${error.data}`
            })
        }
    });
}
