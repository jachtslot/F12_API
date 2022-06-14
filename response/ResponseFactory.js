require('dotenv').config();
const Methods = require('./methods').Methods;

module.exports = class ResponseFactory {

    static WHITELISTED_ORIGIN = "http://localhost:4200";

    static async build(statusCode, method, body) {
        return {
            statusCode: statusCode,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": this.WHITELISTED_ORIGIN,
                "Access-Control-Allow-Methods": `${Methods.OPTION}, ${method}`
            },
            body: body
        };
    };
}
