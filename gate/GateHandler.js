const GateController = require('./GateController')

const openInnerGate = event => {
    return GateController.openInnerGate(event);
}

const openOuterGate = event => {
    return GateController.openOuterGate(event);
}

module.exports = {
    openInnerGate,
    openOuterGate
};

