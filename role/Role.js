const {v4: uuidv4} = require('uuid');
module.exports = class Role {

    constructor(id, name) {
        this.id = id ? id : uuidv4();
        this.name = name;
    }
}
