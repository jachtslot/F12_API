require('dotenv').config();

module.exports = class ResponseFactory {

    static WHITELISTED_ORIGIN = "http://localhost:4200";

    static async build(statusCode, method, body) {
        return {
            statusCode: statusCode,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": this.WHITELISTED_ORIGIN,
                "Access-Control-Allow-Methods": `OPTIONS, ${method.toUpperCase()}`
            },
            body: body
        };
    };
}
