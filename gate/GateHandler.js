const GateController = require('./GateController');
const gateController = new GateController();
const AuthenticationHelper = require('../util/AuthenticationHelper');
const RequestValidator = require('../util/RequestValidator');
const Time = require('../util/Time');

const ResponseFactory = require('../response/ResponseFactory');
const Methods = require('../response/methods').Methods;

module.exports.openInnerGate = async event => {
    const decodedToken = AuthenticationHelper.verifyToken(event);
    const accountId = decodedToken.id;
    const requestValidator = new RequestValidator(accountId, Time.now(), 1);
    if (await requestValidator.hasAccess()) {
        return gateController.openInnerGate(event);
    } else {
        return ResponseFactory.build(
            403,
            Methods.POST,
            `account with id ${accountId} can't open inner gate at ${requestValidator.currentTime}`
        );
    }
}

module.exports.openOuterGate = async event => {
    const decodedToken = AuthenticationHelper.verifyToken(event);
    const accountId = decodedToken.id;
    const requestValidator = new RequestValidator(accountId, Time.now(), 2);
    if (await requestValidator.hasAccess()) {
        return gateController.openOuterGate(event);
    } else {
        return ResponseFactory.build(
            403,
            Methods.POST,
            `account with id ${accountId} can't open outer gate at ${requestValidator.currentTime}`
        );
    }
}
