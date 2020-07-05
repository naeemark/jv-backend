const express = require('express');

const router = express.Router();
const helloRoute = require('./hello');


router.use('/hello', helloRoute);


module.exports = router;
