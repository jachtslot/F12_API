module.exports = class EventMocker {



    static buildWithHeadersAndBody(headers, body) {
        return JSON.stringify({headers: headers, body: body});
    }

    static buildWithAuthHeadersAndBody(token, body) {
        const headers = {
            Authorization: `Bearer ${token}`
        }
        return {headers, body}
    }

    static buildWithAuthHeadersAndEmptyBody(token) {
        const headers = {
            Authorization: `Bearer ${token}`
        }
        const body = {};
        return {headers,body}
    }
    static buildWithAuthHeadersEmptyBodyPathParameters(token, pathParameter) {
        const headers = {
            Authorization: `Bearer ${token}`
        }
        const body = {};
        const pathParameters = {id: pathParameter};
        return {headers,body,pathParameters}
    }

}
