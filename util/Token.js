const { v4: uuidv4 } = require('uuid');

module.exports = class Token {

    constructor(id, username, emailAddress, hashedPassword, role) {
        this.id = id ? id : uuidv4()
        this.username = username;
        this.emailAddress = emailAddress;
        this.hashedPassword = hashedPassword;
        this.role = role;
    }

}
