const {v4: uuidv4} = require('uuid');

module.exports = class Account {

    constructor(id, username, emailAddress, hashedPassword) {
        this.id = id ? id : uuidv4()
        this.username = username;
        this.emailAddress = emailAddress;
        this.hashedPassword = hashedPassword;
    }

}
