const {v4: uuidv4} = require('uuid');

module.exports = class Account {

    constructor(username, emailAddress, hashedPassword) {
        this.id = uuidv4();
        this.username = username;
        this.emailAddress = emailAddress;
        this.hashedPassword = hashedPassword;
    }

}
