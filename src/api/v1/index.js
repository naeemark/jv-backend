const express = require('express');

const router = express.Router();
const helloRoute = require('./hello');
const healthRoute = require('./health');


router.use('/hello', helloRoute);
router.use('/health', healthRoute);


module.exports = router;
