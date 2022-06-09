const {v4: uuidv4} = require('uuid');

module.exports = class Account {

    constructor(role_id, privilege_id, day, begin_time, end_time) {
        this.id = uuidv4();
        this.role_id = role_id;
        this.privilege_id = privilege_id;
        this.day = day;
        this.begin_time = begin_time;
        this.end_time = end_time;
    }
}
