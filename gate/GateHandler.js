const GateController = require('./GateController');
const gateController = new GateController();
const AuthenticationHelper = require('../util/AuthenticationHelper');
const RequestValidator = require('../util/RequestValidator');
const Time = require('../util/Time');

module.exports.openInnerGate = async event => {
    const decodedToken = AuthenticationHelper.verifyToken(event);
    const accountId = decodedToken.id;
    const requestValidator = new RequestValidator(accountId, Time.now(), 1);
    if (await requestValidator.hasAccess()) {
        return gateController.openInnerGate(event);
    }
}

module.exports.openOuterGate = async event => {
    const decodedToken = AuthenticationHelper.verifyToken(event);
    const accountId = decodedToken.id;
    const requestValidator = new RequestValidator(accountId, Time.now(), 2);
    if (await requestValidator.hasAccess()) {
        return gateController.openOuterGate(event);
    }
}
