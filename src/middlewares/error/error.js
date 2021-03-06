const httpStatus = require('http-status');
const expressValidation = require('express-validation');

const { APIError, generateError } = require('@utils/APIError');
const {
  getErrorCode, routes, services, codes
} = require('@utils/ErrorCode');

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = (err, req, res, next) => {
  const response = {
    responseCode: err.status,
    responseMessage: err.message || httpStatus[err.status],
    response: {
      error: err.error,
      stack: err.stack
    }
  };

  if (process.env.NODE_ENV !== 'development') {
    delete response.response.stack;
  }

  if (err.status >= 100 && err.status < 600) {
    res.status(err.status);
  } else {
    res.status(500);
  }

  res.json(response);
  res.end();
};
exports.handler = handler;


/**
 * Convert Validation error into APIError
 *
 * @param  {Object} err   Error object
 * @param  {Object} req   Request object
 */
const convertValidationError = (err, req) => {
  const error = generateError(
    [req.path.replace('/', '').split('/').join(':'), codes.validationError].join(':'),
    'Request Validation Error!',
    err.errors
  );
  return new APIError({ message: 'Validation Error', status: err.status, error });
};

exports.convertValidationError = convertValidationError;

/**
 * Convert generic error into APIError
 *
 * @param  {Object} err   Error object
 * @param  {Object} req   Request object
 * @public
 */
const convertGenericError = (err, req) => {
  const error = generateError(
    err.code || [req.path.replace('/', '').split('/').join(':'), codes.unknown].join(':'),
    'We seem to have a problem!',
    err.message
  );
  return new APIError({ message: 'Internal server error', status: httpStatus.INTERNAL_SERVER_ERROR, error });
};
exports.convertGenericError = convertGenericError;

/**
 * Generate not found error for APIError
 *
 * @param  {Object} err   Error object
 * @param  {Object} req   Request object
 * @public
 */
const generateNotFoundError = () => {
  const error = {
    errorCode: getErrorCode(routes.root, services.route, codes.notFound),
    errorTitle: 'Oops! We have a problem.',
    errorDescription: 'We couldn\'t find what you\'re looking for - please contact our administrator!'
  };
  return new APIError({ message: 'Not found', status: httpStatus.NOT_FOUND, error });
};

exports.generateNotFoundError = generateNotFoundError;

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
exports.converter = (err, req, res, next) => {  // eslint-disable-line
  let convertedError = err;
  if (err instanceof expressValidation.ValidationError) {
    convertedError = convertValidationError(err, req);
  } else if (!(err instanceof APIError)) {
    convertedError = convertGenericError(err, req);
  }

  return handler(convertedError, req, res);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = (req, res, next) => handler(generateNotFoundError(), req, res); // eslint-disable-line
