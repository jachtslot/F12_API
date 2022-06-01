const AccountController = require('./AccountController');

module.exports.createAccount = async event => {
    let responseBody = JSON.parse(event.body);

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

module.exports.getAllAccounts = async event => {
    return await AccountController.getAllAccounts().then(accounts => {
        return {
            statusCode: 200,
            body: JSON.stringify(accounts.rows)
        };
    }).catch(error => {
        return {
            statusCode: 500,
            body: error.message
        }
    });
}
