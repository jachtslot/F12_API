const AccountController = require('./AccountController');

module.exports.createAccount = async event => {
    console.log(event.body)
    let responseBody = JSON.parse(event.body);
    // let responseBody = {
    //     username: 'testuserformail',
    //     email_address: 's1127893@student.hsleiden.nl',
    //     hashed_password: 'oiqwue9182u'
    // };
    // // responseBody.username = 'TestusernameForEmail'
    // // responseBody.email_address = 's1127893@student.hsleiden.nl'
    // // responseBody.hashed_password = 'woidj29ewUD';
    // console.log(responseBody)

    return await AccountController.createAccount(responseBody).then(() => {
        return {
            statusCode: 200,
            body: 'A new Account is created'
        };
    }).catch(error => {
        return {
            statusCode: 500,
            body: error.message
        }
    });
}
