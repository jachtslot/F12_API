const RoleController = require('./RoleController');

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
