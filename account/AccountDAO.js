const { v4: uuidv4 } = require('uuid');

module.exports = class UserDAO {

    static createAccount() {
        const query = `
            INSERT INTO account (id, username, email_address, hashed_password)
            VALUES ($1, $2, $3, $4)
        `;
        const values = [
            uuidv4(),
            'username_example',
            'email_address_example',
            'hashed_password_example'
        ];

        return {query, values}
    }
}
