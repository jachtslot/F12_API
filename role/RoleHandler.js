const RoleController = require('./RoleController');
const AccountController = require('../account/AccountController');

module.exports.createRole = async event => {
    let responseBody = JSON.parse(event.body);
    let roleName = responseBody.name;

    return await RoleController.createRole(roleName).then(() => {
       return {
           statusCode: 201,
           headers: {
               "Access-Control-Allow-Headers": "Content-Type",
               "Access-Control-Allow-Origin": "http://localhost:4200",
               "Access-Control-Allow-Methods": "OPTIONS,POST"
           },
           body: `The role ${roleName} is created!`
       }
    }).catch(error => {
        return {
            statusCode: 500,
            body: error.message
        }
    });
}

module.exports.deleteRole = async event => {
    let id = event.pathParameters.id;

    return await RoleController.deleteRole(id).then(() => {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "http://localhost:4200",
                "Access-Control-Allow-Methods": "OPTIONS,DELETE"
            },
            body: `The role is deleted!`
        }
    }).catch(error => {
        return {
            statusCode: 500,
            body: error.message
        }
    });
}

module.exports.addAccountToRole = async event => {
    let responseBody = JSON.parse(event.body);
    let roleId = responseBody.role_id;
    let accountId = responseBody.account_id;

    let account = await AccountController.getAccount(accountId).catch(() => {
        return {
            statusCode: 404,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "http://localhost:4200",
                "Access-Control-Allow-Methods": "OPTIONS,POST"
            },
            body: `Account with id '${accountId} could not be found!`
        }
    });

    return await RoleController.addAccountToRole(roleId, accountId).then(() => {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "http://localhost:4200",
                "Access-Control-Allow-Methods": "OPTIONS,POST"
            },
            body: `The account ${account[0].username} is added to the role ${roleId}`
        }
    });
}

module.exports.removeAccountFromRole = async event => {
    let responseBody = JSON.parse(event.body);
    let roleId = responseBody.role_id;
    let accountId = responseBody.account_id;

    return await RoleController.removeAccountFromRole(roleId, accountId).then(() => {
        return {
            statusCode: 201,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "http://localhost:4200",
                "Access-Control-Allow-Methods": "OPTIONS,DELETE"
            },
            body: `Added account ${accountId} to role ${roleId}`
        }
    });
}
