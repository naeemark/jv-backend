const express = require('express');
const validate = require('express-validation');
const controller = require('./delete.controller');
const validator = require('./delete.validator');

const router = express.Router();

/**
 * @api {delete} api/v1/delete delete
 * @apiDescription Deletes the exixting outlet
 * @apiVersion 1.0.0
 * @apiName delete
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
  .delete(validate(validator.joiSchema), controller.delete);

module.exports = router;
