const express = require('express');
const validate = require('express-validation');
const controller = require('./login.controller');
const validator = require('./login.validator');

const router = express.Router();

/**
 * @api {post} api/v1/login login
 * @apiDescription Login w/ Email and Password
 * @apiVersion 1.0.0
 * @apiName login
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
  .post(validate(validator.joiSchema), controller.login);

module.exports = router;
