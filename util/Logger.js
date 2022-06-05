require('dotenv').config();

const winston = require('winston')
const CloudWatchTransport = require('winston-aws-cloudwatch')

const logger = winston.createLogger({
    transports: [
        new CloudWatchTransport({
            logGroupName: process.env.CLOUDWATCH_GROUP_NAME, // REQUIRED
            logStreamName: process.env.CLOUDWATCH_STREAM_NAME, // REQUIRED
            createLogGroup: true,
            createLogStream: true,
            submissionInterval: 2000,
            submissionRetryCount: 1,
            batchSize: 20,
            awsConfig: {
                accessKeyId: process.env.CLOUDWATCH_ACCESS_KEY,
                secretAccessKey: process.env.CLOUDWATCH_SECRET_ACCESS_KEY,
                region: process.env.CLOUDWATCH_REGION
            }
        })
    ]
})

module.exports = logger;
