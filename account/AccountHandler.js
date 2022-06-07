const AccountController = require('./AccountController');
const Account = require('./Account');
const bcrypt = require('bcryptjs');

module.exports.createAccount = async event => {
    const responseBody = JSON.parse(event.body);

    const username = responseBody.username;
    const email = responseBody.email_address;
    const password = responseBody.hashed_password;

    const hashedAccount = await bcrypt.hash(password, 12).then(hashedPw => {
        return new Account(null, username, email, hashedPw);
    });
    return await AccountController.createAccount(hashedAccount).then((account) => {

        return {
            statusCode: 201,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "http://localhost:4200",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: JSON.stringify({
                'id': account.id,
                'username': account.username,
                'email_address': account.emailAddress
            })
        }
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
    return await AccountController.getAllAccounts().then(account => {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "http://localhost:4200",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: JSON.stringify(account)
        };
    });
}

module.exports.getAccount = async event => {
    let id = event.pathParameters.id;
    return await AccountController.getAccount(id).then(account => {

        if (account.length <= 0) {
            return {
                statusCode: 404,
                body: `The Account with id: '${id}' was not found.`
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify(account[0])
        }
    });
}
