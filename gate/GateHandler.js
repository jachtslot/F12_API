const GateController = require('./GateController');
const gateController = new GateController();
const AuthenticationHelper = require('../util/AuthenticationHelper');
const RequestValidator = require('../util/RequestValidator');
const Time = require('../util/Time');
const logger = require('../util/Logger');


const ResponseFactory = require('../response/ResponseFactory');
const UnauthorizedUserError = require('../authentication/UnauthorizedUserError');
const Methods = require('../response/methods').Methods;

module.exports.openInnerGate = async event => {
    const decodedToken = AuthenticationHelper.verifyToken(event);
    const accountId = decodedToken.id;
    const requestValidator = new RequestValidator(accountId, Time.now(), 1);
    const access = await requestValidator.hasAccess();
    if (!access) {
        throw new UnauthorizedUserError('User not authorized at this moment.');
    }
    try {
        await gateController.openInnerGate();
        await logger.info(`User with account id: ${accountId} has opened the inner gate`)
        return ResponseFactory.build(200, Methods.GET, `The gate will now open`)
    } catch (error) {
        await logger.error(`An error occurred when account with id: ${accountId} tried to open inner gate | ${error.stackTrace}`)
        return ResponseFactory.build(403, Methods.GET, error.stackTrace)
    }
}

module.exports.openOuterGate = async event => {
    const decodedToken = AuthenticationHelper.verifyToken(event);
    const accountId = decodedToken.id;
    const requestValidator = new RequestValidator(accountId, Time.now(), 2);
    const access = await requestValidator.hasAccess();
    if (!access) {
        throw new UnauthorizedUserError('User not authorized at this moment.');
    }
    try {
        await gateController.openOuterGate(event);
        await logger.info(`User with account id: ${accountId} has opened the outer gate`)
        return ResponseFactory.build(200, Methods.GET, `The gate will now open`)
    } catch (error) {
        await logger.error(`An error occurred when account with id: ${accountId} tried to open outer gate | ${error.stackTrace}`)
        return ResponseFactory.build(403, Methods.GET, error.stackTrace)
    }
}
