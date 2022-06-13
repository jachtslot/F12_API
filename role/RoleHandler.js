require('./Role');
const RoleController = require('./RoleController');
const Role = require('./Role');

module.exports.createRole = async event => {
    const responseBody = JSON.parse(event.body);
    const role = new Role(null, responseBody.name);

    return await RoleController.createRole(role).then(() => {
       return {
           statusCode: 201,
           headers: {
               "Access-Control-Allow-Headers": "Content-Type",
               "Access-Control-Allow-Origin": "http://localhost:4200",
               "Access-Control-Allow-Methods": "OPTIONS,POST"
           },
           body: JSON.stringify(role)
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
