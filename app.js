const express = require('express');

const app = express();

const GateRoutes = require('./routes/Gate');

app.use(express.json())

app.use('/gates', GateRoutes);

app.listen(3000);
