const RoleController = require('./RoleController');

module.exports.createRole = async event => {
    let responseBody = JSON.parse(event.body);
    let roleName = responseBody.name;

    return await RoleController.createRole(roleName).then(() => {
       return {
           statusCode: 201,
           body: `The role ${roleName} is created!`
       }
    }).catch(error => {
        return {
            statusCode: 500,
            body: error.message
        }
    });
}