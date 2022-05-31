const AccountController = require('./AccountController');
const {response} = require('express');

module.exports.createAccount = async event => {
    // let responseBody = JSON.parse(event.body);
    let responseBody = {
        "username": "test",
        "email_address": "invalidMail",
        "hashed_password": "saokdjhaouwdh"
    }

    return await AccountController.createAccount(responseBody).then(() => {

        return {
            statusCode: 200,
            body: 'A new Account is created!'
        };
    }).catch(error => {
        return {
            statusCode: 500,
            body: error.message
        }
    });
}

module.exports.deleteAccount = async event => {
    let responseBody = JSON.parse(event.body);
    let emailAddress = responseBody.email_address;

    return await AccountController.deleteAccount(emailAddress).then(() => {
       return {
           statusCode: 200,
           body: `Account with email address ${emailAddress} is deleted!`
       };
    }).catch(error => {
        return {
            statusCode: 500,
            body: error.message
        }
    });
}
