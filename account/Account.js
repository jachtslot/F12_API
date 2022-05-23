module.exports = class Account {

    constructor(username, emailAddress, hashedPassword) {
        this.username = username;
        this.emailAddress = emailAddress;
        this.hashedPassword = hashedPassword;
    }
}
