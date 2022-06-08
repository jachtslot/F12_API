module.exports = class Role {

    constructor(id, name) {
        this.id = id
        this.name = name;
        this.accounts = [];
    }

    addAccount(account) {
        this.accounts.push(account);
    }
}
