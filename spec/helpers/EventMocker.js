module.exports = class EventMocker {

    generateHeaders(headers) {

    }

    static buildWithHeadersAndBody(headers, body) {
        return JSON.stringify({headers: headers, body: body});
    }

    static buildWithAuthHeadersAndBody(token, body) {
        const headers = {
            Authorization: `Bearer ${token}`
        }
        return JSON.stringify({headers, body})
    }

    static generateEventWithAuthHeaders


}
