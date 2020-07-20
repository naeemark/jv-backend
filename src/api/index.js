const express = require('express');

const router = express.Router();
const healthRoute = require('./health');
const v1 = require('./v1');

/* GET health */
router.use('/health', healthRoute);

/* GET v1 */
router.use('/v1', v1);

module.exports = router;
