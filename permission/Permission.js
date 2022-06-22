const {v4: uuidv4} = require('uuid');

module.exports = class Permission {

    constructor(id, role_id, privilege_id, p_day, start_time, end_time) {
        this.id = id ? id : uuidv4()
        this.role_id = role_id;
        this.privilege_id = privilege_id;
        this.p_day = p_day;
        this.start_time = start_time;
        this.end_time = end_time;
    }
}
