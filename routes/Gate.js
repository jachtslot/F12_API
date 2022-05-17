const express = require('express');

const GateController = require('../open-gate/GateController');
const router = express.Router();

router.post('/open/1', GateController.openInnerGate);
router.post('/open/2', GateController.openOuterGate);

module.exports = router;
