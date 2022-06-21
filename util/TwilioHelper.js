
require('dotenv').config();

module.exports = class TwilioHelper {
    accountSid = process.env.TWILIO_ACCOUNT_SID;
    authToken = process.env.TWILIO_AUTH_TOKEN;
    numberTo = process.env.TWILIO_NUMBER_TO;
    numberFrom = process.env.TWILIO_NUMBER_FROM;
    client;

    constructor() {
        this.client = require('twilio')(this.accountSid, this.authToken);
    }

    async makeCall() {
        await this.client.calls.create({
            twiml: '<Response><Pause length="1"/><Say>The gate will now open, please wait.</Say><Pause length="1"/></Response>',
            to: this.numberTo,
            from: this.numberFrom,
            timeout: 10,
            timeLimit: 5
        })
    }
}


