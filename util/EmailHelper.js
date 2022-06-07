const AWS = require('aws-sdk');
require('dotenv').config();
const formatEmail = require('./EmailTemplate');

const SES_CONFIG = {
    accessKeyId: process.env.SES_ACCESS_KEY,
    secretAccessKey: process.env.SES_SECRET,
    region: process.env.CLOUDWATCH_REGION,
};

const AWS_SES = new AWS.SES(SES_CONFIG);

const sendRegistrationEmail = async (email, password) => {
    const template = formatEmail(email, password)
    return await AWS_SES.sendEmail(template).promise();
}

module.exports = sendRegistrationEmail;
