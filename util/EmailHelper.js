const AWS = require('aws-sdk');
require('dotenv').config();

const SES_CONFIG = {
    accessKeyId: process.env.SES_ACCESS_KEY,
    secretAccessKey: process.env.SES_SECRET,
    region: process.env.CLOUDWATCH_REGION,
};

const AWS_SES = new AWS.SES(SES_CONFIG);

const sendRegistrationEmail = async (email, password) => {
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
                    Data: 'Beste, <br>' +
                        'Vanaf nu is het mogelijk om op ingestelde tijdstippen het landgoed Ter Horsten te betreden. <br>' +
                        'Met de bijgevoegde inloggegevens kan via de app {{LINK}} toegang worden verkregen<br>' +
                        `emailadres: ${email}<br>
                        wachtwoord: ${password}`,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: `Toegang tot Landgoed Ter Horst`,
            }
        },
    };
    return await AWS_SES.sendEmail(params).promise();
}

module.exports = sendRegistrationEmail;
