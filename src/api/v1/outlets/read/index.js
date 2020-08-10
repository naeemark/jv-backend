const express = require('express');
const validate = require('express-validation');
const { authMiddleware } = require('@middlewares/auth');
const controller = require('./read.controller');
const validator = require('./read.validator');

const router = express.Router();

/**
 * @api {get} api/v1/read read
 * @apiDescription Get the Outlet for the user
 * @apiVersion 1.0.0
 * @apiName read
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
  .get(validate(validator.joiSchema), authMiddleware, controller.read);

module.exports = router;
