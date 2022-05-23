const axios = require('axios');
const AccountController = require('./AccountController');

const createAccount = async event => {
    return AccountController.createAccount();
}
