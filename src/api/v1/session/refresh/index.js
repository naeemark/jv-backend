const express = require('express');
const validate = require('express-validation');
const { authMiddleware } = require('@middlewares/auth');
const controller = require('./refresh.controller');
const validator = require('./refresh.validator');

const router = express.Router();

/**
 * @api {post} api/v1/refresh refresh
 * @apiDescription An API to get a new pair of Tokens by using JwtRefreshToken
 * @apiVersion 1.0.0
 * @apiName refresh
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
  .post(validate(validator.joiSchema), authMiddleware, controller.refresh);

module.exports = router;
