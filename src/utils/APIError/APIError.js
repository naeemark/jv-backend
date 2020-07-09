const httpStatus = require('http-status');
const Class = require('es-class');
const appErrorCode = require('./ErrorCode');

/**
 * Wrap Error
 * @param {String} errCode        Code
 * @param {String} errTitle       Title
 * @param {String} errDesc        Description
 */
const generateError = (errorCode, errorTitle, errorDescription) => {
  const result = { errorCode, errorTitle, errorDescription };
  return result;
};

/**
 * @extends Error
 */
const ExtendableError = Class({
  extends: Error,
  constructor({
    // eslint-disable-line
    message,
    errors,
    route,
    status,
    isPublic,
    stack
  }) {
    this.super(message);
    this.name = this.constructor.name;
    this.message = message || 'Oops! Something is wrong';
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.route = route;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    this.stack = stack;
  }
});

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor({
    message, errors, route = 'default', stack, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic = false
  }) {
    super({
      message,
      errors,
      route,
      status,
      isPublic,
      stack
    });
  }

  static errorVerifyEmail() {
    return new APIError({
      message: 'Error Verify Email',
      status: httpStatus.ORIGIN_IS_UNREACHABLE,
      errors: [generateError('ORIGIN_IS_UNREACHABLE', 'Oops! Something is wrong', 'The verification was not successful!')]
    });
  }

  static errorAlreadyVerifiedEmail() {
    return new APIError({
      message: 'Error Verify Email',
      status: httpStatus.FORBIDDEN,
      errors: [generateError('FORBIDDEN', 'Oops! Something is wrong', 'The user email is already verified!')]
    });
  }

  static notFound() {
    return new APIError({
      message: 'Resource not found!',
      status: httpStatus.NOT_FOUND,
      errors: [generateError('NOT_FOUND', 'Oops! Something is wrong', 'The resource you are looking for does not exist!')]
    });
  }

  static notUpdated() {
    return new APIError({
      message: 'Resource not Updated!',
      status: httpStatus.NOT_MODIFIED,
      errors: [generateError('NOT_MODIFIED', 'Oops! Something is wrong', 'The resource is not updated!')]
    });
  }

  static userNotFound() {
    return new APIError({
      message: 'User not found!',
      status: httpStatus.NOT_FOUND,
      errors: [generateError('USER_NOT_FOUND', 'Oops! Something is wrong', 'The user you are looking for does not exist!')]
    });
  }

  static userAlreadyExists() {
    return new APIError({
      message: 'User already exits!',
      status: httpStatus.CONFLICT,
      errors: [generateError('USER_CONFLICT', 'Oops! Something is wrong', 'Can not create new user with these attributes!')]
    });
  }

  static invalidPassword() {
    return new APIError({
      message: 'Password does not match!',
      status: httpStatus.UNAUTHORIZED,
      errors: [generateError('UNAUTHORIZED', 'Invalid Password', 'Wrong password was supplied!')]
    });
  }

  static forbidden() {
    return new APIError({
      message: 'Request forbidden!',
      status: httpStatus.FORBIDDEN,
      errors: [generateError('FORBIDDEN', 'Oops! Something is wrong', 'This resource is forbidden')]
    });
  }


  static socialAuthFailed(message) {
    return new APIError({
      message: 'Social Auth Failed!',
      status: httpStatus.PRECONDITION_FAILED,
      errors: [generateError('PRECONDITION_FAILED', 'Oops! Something is wrong', message)]
    });
  }

  static unauthorizedRequest() {
    return new APIError({
      message: 'Request Unauthorized!',
      status: httpStatus.UNAUTHORIZED,
      errors: [generateError('UNAUTHORIZED', 'Oops! Something is wrong', 'You are not authorized for the action')]
    });
  }

  static unauthorized() {
    return APIError.withCode('UNAUTHORIZED', httpStatus.UNAUTHORIZED);
  }

  static withCode(code, status, errorAttibutes) {
    const errorCode = code && appErrorCode[code] ? code : 'UNSPECIFIED';
    const _error = appErrorCode[errorCode];
    const errAttributes = errorAttibutes || {};
    if (errorCode === 'UNSPECIFIED') {
      errAttributes.missingCode = code;
    }
    const errors = [generateError(errorCode, _error.errTitle, _error.errDesc)];
    return new APIError({ message: _error.errTitle, status: status || 400, errors });
  }
}

module.exports = {
  APIError,
  generateError
};
