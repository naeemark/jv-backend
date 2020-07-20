const express = require('express');
const validate = require('express-validation');
const controller = require('./health.controller');
const validator = require('./health.validator');

const router = express.Router();

/**
 * @api {get} api/v1/health health
 * @apiDescription To check the availability
 * @apiVersion 1.0.0
 * @apiName health
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
  .get(validate(validator.joiSchema), controller.health);

module.exports = router;
