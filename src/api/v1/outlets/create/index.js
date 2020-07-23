const express = require('express');
const validate = require('express-validation');
const { authMiddleware } = require('@middlewares/auth');
const controller = require('./create.controller');
const validator = require('./create.validator');

const router = express.Router();

/**
 * @api {post} api/v1/create create
 * @apiDescription Creates a new Outlet
 * @apiVersion 1.0.0
 * @apiName create
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
  .post(validate(validator.joiSchema), authMiddleware, controller.create);

module.exports = router;
