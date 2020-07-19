/**
 * Auth Middleware
 *
 */
const _ = require('lodash');
const { APIError } = require('@utils/APIError');
const { errorMiddleware } = require('@middlewares/error');
const { auth } = require('@utils/auth');
const { logger } = require('@utils/logger');

/**
 * Middleware to authenticate the request
 * @param {Object} req          Request object
 * @param {Object} res          Response object
 * @param {Func} next           Next Object
 */
const authMiddleware = async (req, res, next) => {

  const authMiddlewareError = (error) => errorMiddleware.converter(error, req, res, next);

  try {
    const token = req.headers.authorization;
    if (_.isEmpty(token)) {
      return authMiddlewareError(APIError.withCode('FORBIDDEN', 403))
    }
    const decodedPayload = await auth.verifyToken(token);
    if (req.headers.refreshToken && decodedPayload.type !== 'refresh')
      return authMiddlewareError(APIError.onlyRefreshTokenIsAllowed());
    req.user = decodedPayload;
    return next();
  } catch (error) {
    logger.error(error)
    return authMiddlewareError(APIError.unauthorized());
  }
};

module.exports = {
  authMiddleware
};
