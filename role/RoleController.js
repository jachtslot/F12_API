const RoleDAO = require('./RoleDAO');

module.exports = class RoleController {

    static async createRole(roleName) {
        return RoleDAO.getRole(roleName).then(role => {
            if (role.rows.length > 0) {
                throw new Error(`Role with name '${roleName}' already exists!`);
            }

            return RoleDAO.createRole(roleName);
        });
    }
}
