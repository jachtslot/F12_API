const GateController = require('./GateController');
const axios = require("axios");
const logger = require("../util/Logger");
const formatDate = require("../util/DateFormatter");
const http = require("http");
'use strict';

const innerGateURL = 'https://maker.ifttt.com/trigger/sandbox/with/key/fe_PVQCQTRtpODw0fOy9x9hFWIXJ108XNxwmv2UEiSc';

const openInnerGate = async (event) => {

      return axios.get(innerGateURL).then(response => {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `${response.data}`
            })
        }
    }).catch(error => {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: `${error.data}`
            })
        }
    });

}



/*logger.info(event)

axios.get(innerGateURL)
    .then(data => {
        logger.info(data)
        logger.info(`${formatDate(new Date())} - Request successful with "${event}" at ${event.path}`)
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Het hek wordt geopend',
                input: event
            },null,
                2),
        };
    }).catch(error => {
    logger.info(error)
    logger.error(`${formatDate(new Date())} - Request failed with "(${error})" at ${event.path}`);
    return {
        statusCode: 500,
        body: JSON.stringify(error + 'mike check')
    }
});*/
// console.log(event.body);
//     return {
//         statusCode: 200,
//         body: JSON.stringify(
//             {
//                 message: 'Go Serverless v1.0! Your function executed successfully!',
//                 input: event,
//             },
//             null,
//             2
//         ),
//     };

// Use this code if you don't use the http event with the LAMBDA-PROXY integration
// return { message: 'Go Serverless v1.0! Your function executed successfully!', event };


// axios.get(innerGateURL)
//     .then(data => {
//         logger.info(`${formatDate(new Date())} - Request successful with "${event.data}" at ${event.path}`)
//         return response = {
//             statusCode: 200,
//             body: JSON.stringify('The gate is opening, please wait.')
//         }
//     }).catch(error => {
//     logger.error(`${formatDate(new Date())} - Request failed with "(${error})" at ${event.path}`);
//     return response = {
//         statusCode: 500,
//         body: JSON.stringify("Something went wrong, please try again.")
//     }
// });


const openOuterGate = async (event) => {
    return GateController.openOuterGate(event);
}

module.exports = {
    openInnerGate,
    openOuterGate
};
// const http = require('http');
// const axios = require('axios');
// const logger = require('../util/Logger');
// const formatDate = require('../util/DateFormatter');
//
// const innerGateURL = 'https://maker.ifttt.com/trigger/sandbox/with/key/fe_PVQCQTRtpODw0fOy9x9hFWIXJ108XNxwmv2UEiSc';
// const outerGateURL = 'http://localhost:3001/openOuter'
//
//
// module.exports.openInnerGate = event => {
//
// }

// exports.openOuterGate = event => {
//     axios.get(outerGateURL)
//         .then(data => {
//             logger.info(`${formatDate(new Date())} - Request successful with "${event.data}" at ${event.path}`)
//         }).catch(error => {
//         logger.error(`${formatDate(new Date())} - Request failed with "(${error})" at ${event.path}`);
//         res.status(500).send('Something went wrong. Please try again.')
//     })
// }
