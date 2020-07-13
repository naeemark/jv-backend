/**
 * Auth Middleware
 *
 */
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { APIError } = require('@utils/APIError');
const { errorMiddleware } = require('@middlewares/error');
const { jwtTokenSecret } = require('@config/vars');
const { auth } = require('@utils/auth');
const { logger } = require('@utils/logger');

/**
 * Middleware to authenticate the request
 * @param {Object} req          Request object
 * @param {Object} res          Response object
 * @param {Func} next           Next Object
 */
const authMiddleware = async (req, res, next) => {
  const unauthorized = () => {
    const err = APIError.withCode('UNAUTHORIZED', 401);
    return errorMiddleware.converter(err, req, res, next);
  };
  const refreshTokenError = () => {
    const err = APIError.onlyRefreshTokenIsAllowed();
    return errorMiddleware.converter(err, req, res, next);
  };
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (_.isEmpty(token)) {
      throw APIError.unauthorized();
    }
    const decodedPayload = await auth.verifyToken(token);
    if (req.headers.refreshToken && decodedPayload.type !== 'refresh')
      return unauthorized();
    req.user = decodedPayload;
    return next();
  } catch (error) {
    logger.error(error)
    return unauthorized();
  }
};

module.exports = {
  authMiddleware
};
