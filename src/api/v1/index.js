const express = require('express');

const router = express.Router();
const helloRoute = require('./hello');
const healthRoute = require('./health');
const startRoute = require('./session/start');


router.use('/hello', helloRoute);
router.use('/health', healthRoute);
router.use('/session/start', startRoute);


module.exports = router;
