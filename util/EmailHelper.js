const AWS = require('aws-sdk');
require('dotenv').config();

const SES_CONFIG = {                    //TODO: Verplaats naar env
    accessKeyId: 'AKIAYEG4ZWW646UIPVX4',
    secretAccessKey: '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',
    region: 'eu-west-1',
};

const AWS_SES = new AWS.SES(SES_CONFIG);

const sendRegistrationEmail = (email, password) => {
    let params = {
        Source: process.env.EMAIL_SENDER,
        Destination: {
            ToAddresses: [
                email
            ],
        },
        ReplyToAddresses: [],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: 'Beste, ' +
                        `emailadres: ${email}
                        wachtwoord: ${password}`,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: `Toegang tot Landgoed Ter Horst`,
            }
        },
    };
    return AWS_SES.sendEmail(params).promise();
}

module.exports = sendRegistrationEmail;
