require('dotenv').config();
const axios = require('axios');
const TwilioHelper = require('../util/TwilioHelper');
const twilioHelper = new TwilioHelper({debug:true});
const innerGateURL = process.env.INNER_GATE_URL_SANDBOX;

module.exports = class GateController {

    async openInnerGate() {
        return await axios.get(innerGateURL);
    }

    async openOuterGate() {
        return await twilioHelper.makeCall();
    }
}
