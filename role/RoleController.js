const RoleDAO = require('./RoleDAO');

module.exports = class RoleController {

    static async createRole(roleName) {
        let existingRoles = await RoleDAO.getRole(roleName);

        if (existingRoles.length > 0) {
            throw new Error(`Role with name '${roleName}' already exists!`);
        }

        return RoleDAO.createRole(roleName);
    }
}
