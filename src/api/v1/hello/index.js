const express = require('express');
const validate = require('express-validation');
const controller = require('./hello.controller');
const validator = require('./hello.validator');

const router = express.Router();

/**
 * @api {get} api/v1/hello hello
 * @apiDescription This is a sample API
 * @apiVersion 1.0.0
 * @apiName hello
 * @apiPermission public
 *
 * @apiParam  {String} [param]  Put some parameter schema here
 *
 * @apiSuccess {Number} responseCode     HTTP Response Code
 * @apiSuccess {String} responseMessage  Response message
 * @apiSuccess {Object} response         Response object
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route('/')
  .get(validate(validator.joiSchema), controller.hello);

module.exports = router;
