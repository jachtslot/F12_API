require('dotenv').config();
const axios = require('axios');
const logger = require('../util/Logger');
const TwilioHelper = require('../util/TwilioHelper');
const twilioHelper = new TwilioHelper({debug:true});
const innerGateURL = process.env.INNER_GATE_URL_SANDBOX;

module.exports = class GateController {

    async openInnerGate(event) {
        return await axios.get(innerGateURL);
    }

    async openOuterGate(event) {
        return await twilioHelper.makeCall(event);
    }
}
