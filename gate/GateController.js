require('dotenv').config();
const axios = require('axios');
const logger = require('../util/Logger');
const TwilioHelper = require('../util/TwilioHelper');
const twilioHelper = new TwilioHelper();
const innerGateURL = process.env.INNER_GATE_URL_SANDBOX; //Sandbox env

'use strict';

const openInnerGate = event => {
    return axios.get(innerGateURL).then(() => {
        logger.info(`Open inner gate at: ${event.path} successful.`);

        return {
            statusCode: 200,
            body: JSON.stringify(
                'The inner gate will now open, please wait.'
            )
        }
    }).catch(error => {
        logger.error(`Request failed with "(${error})" at ${event.path}`);

        return {
            statusCode: 500,
            body: JSON.stringify(
                `Something went wrong. Please try again. `
            )
        }
    });
}


const openOuterGate = event => {
    twilioHelper.makeCall();
    logger.info(`Request with path: ${event.path} successful.`);
}

module.exports = {
    openInnerGate,
    openOuterGate
}

