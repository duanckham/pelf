const express = require('express');
const router = require('./routers');
const config = require('../config');
const app = express();

// Bind router.
router(app);

// Starting.
app.listen(config.services.web.port, config.services.web.host);

console.log('> services:pelf app running.');