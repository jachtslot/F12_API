const http = require('http');
const axios = require('axios');
const logger = require('../util/Logger');
const formatDate = require('../util/DateFormatter');

const outerGateURL = 'http://localhost:3001/openOuter'


module.exports.openInnerGate = event => {

}

exports.openOuterGate = event => {
    axios.get(outerGateURL)
        .then(data => {
            logger.info(`${formatDate(new Date())} - Request successful with "${event.data}" at ${event.path}`)
        }).catch(error => {
        logger.error(`${formatDate(new Date())} - Request failed with "(${error})" at ${event.path}`);
        res.status(500).send('Something went wrong. Please try again.')
    })
}
