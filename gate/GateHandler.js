const GateController = require('./GateController');
const gateController = new GateController();

module.exports.openInnerGate = event => {
    return gateController.openInnerGate(event);
}

module.exports.openOuterGate = event => {
    return gateController.openOuterGate(event);
}
