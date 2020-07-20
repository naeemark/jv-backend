const express = require('express');

const router = express.Router();
const helloRoute = require('./hello');
const startRoute = require('./session/start');
const refreshRoute = require('./session/refresh');

const registerUserRoute = require('./user/register');
const loginRoute = require('./user/login');
const getUserRoute = require('./user/get');


router.use('/hello', helloRoute);

router.use('/session/start', startRoute);
router.use('/session/refresh', refreshRoute);

router.use('/user/register', registerUserRoute);
router.use('/user/login', loginRoute);
router.use('/user', getUserRoute);


module.exports = router;
