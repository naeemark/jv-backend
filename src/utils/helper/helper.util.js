const _ = require('lodash');
const httpStatus = require('http-status');
const { APIError } = require('@utils/APIError');
const crypto = require('crypto');

/**
 * Utility function to handle response
 * @param {Object} res                        Response object of express
 * @param {String} responseMessage            The response message which needs to send
 * @param {any} response                      The response object which needs to send
 * @param {Number} statusCode                 The status code of the request
 */
const OK = (res, responseMessage = 'OK', response = null, status = httpStatus.OK) => {
  res.status(status);
  return res.json({
    responseCode: status,
    responseMessage,
    response
  });
};

/**
 * Handle API Error
 * @param {Object} err            Error Object
 * @param {String} method         Method which invokes this handler
 * @param {String} service        Service which invokes this handler
 *
 * @return APIError object
 *
 * @public
 */
const handleApiError = (err) => {
  if (err instanceof APIError) return err;
  if (!err.response) {
    if (err.request) {
      if (err.code === 'ECONNABORTED') {
        return APIError.withCode('EXTERNAL_SERVICE_TIMEOUT', httpStatus.GATEWAY_TIMEOUT);
      }
      return APIError.withCode('EXTERNAL_SERVICE_INVALID_RESPONSE', httpStatus.BAD_GATEWAY);
    }
    return APIError.withCode('EXTERNAL_SERVICE_INVALID_REQUEST', httpStatus.INTERNAL_SERVER_ERROR);
  }
  const errorStatus = err.response.status;
  if (errorStatus === httpStatus.UNAUTHORIZED) {
    return APIError.withCode('UNAUTHORIZED', errorStatus);
  }
  if (errorStatus === httpStatus.FORBIDDEN) {
    return APIError.withCode('FORBIDDEN', errorStatus);
  }
  if (errorStatus === httpStatus.NOT_FOUND) {
    return APIError.withCode('NOT_FOUND', errorStatus);
  }
  return APIError.withCode('EXTERNAL_SERVICE_FAILURE', errorStatus);
};

/**
 * Generate Hash Key for caching
 * @param {String} key              Cache key prefix
 * @param {any} option              Cache key dynamic options to be hashed
 */
const generateMd5CacheKey = (key, option) => {
  let cacheOptions = option || {};
  if (typeof cacheOptions !== 'string') {
    cacheOptions = JSON.stringify(_.sortBy(cacheOptions));
  }
  const cacheKey = (key || '') + crypto.createHash('md5').update(cacheOptions).digest('hex');
  return cacheKey;
};

module.exports = {
  OK,
  handleApiError,
  generateMd5CacheKey
};
