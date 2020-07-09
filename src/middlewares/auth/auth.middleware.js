/**
 * Auth Middleware
 *
 */
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { APIError } = require('@utils/APIError');
const { errorMiddleware } = require('@middlewares/error');
const { jwtTokenSecret, serviceTokenSecret } = require('@config/vars');
const { logger } = require('@utils/logger');

/**
 * Middleware to authenticate the request
 * @param {Object} req          Request object
 * @param {Object} res          Response object
 * @param {Func} next           Next Object
 */
const authMiddleware = async (req, res, next) => {
  logger.error('here')
  const unauthorized = () => {
    const err = APIError.withCode('UNAUTHORIZED', 401);
    return errorMiddleware.converter(err, req, res, next);
  };
  const serviceToken = req.headers['x-service-token'];
  if (!_.isNil(serviceToken) && serviceToken === serviceTokenSecret) {
    req.user = {};
    return next();
  }
  try {
    const token = req.headers.authorization;
    if (_.isEmpty(token)) {
      throw APIError.unauthorized();
    }
    const decoded = jwt.verify(token.split(/\s+/).pop(), jwtTokenSecret);
    req.user = decoded;
    return next();
  } catch (error) {
    return unauthorized();
  }
};

module.exports = {
  authMiddleware
};
