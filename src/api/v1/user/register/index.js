const express = require('express');
const validate = require('express-validation');
const controller = require('./register.controller');
const validator = require('./register.validator');

const router = express.Router();

/**
 * @api {post} api/v1/register register
 * @apiDescription Register a new User
 * @apiVersion 1.0.0
 * @apiName register
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
  .post(validate(validator.joiSchema), controller.register);

module.exports = router;
