const express = require('express');
const validate = require('express-validation');
const controller = require('./start.controller');
const validator = require('./start.validator');

const router = express.Router();

/**
 * @api {post} api/v1/start start
 * @apiDescription Start a session by fetching a valid JWT Token
 * @apiVersion 1.0.0
 * @apiName start
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
  .post(validate(validator.joiSchema), controller.start);

module.exports = router;
