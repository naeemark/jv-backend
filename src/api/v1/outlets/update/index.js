const express = require('express');
const validate = require('express-validation');
const controller = require('./update.controller');
const validator = require('./update.validator');

const router = express.Router();

/**
 * @api {put} api/v1/update update
 * @apiDescription Updates the existing outlet
 * @apiVersion 1.0.0
 * @apiName update
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
  .put(validate(validator.joiSchema), controller.update);

module.exports = router;
