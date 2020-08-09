const httpStatus = require('http-status');
const Class = require('es-class');
const appErrorCode = require('./ErrorCode');

/**
 * Wrap Error
 * @param {String} errCode        Code
 * @param {String} errTitle       Title
 * @param {String} errDesc        Description
 */
const generateError = (code, title, description) => ({ code, title, description });


/**
 * @extends Error
 */
const ExtendableError = Class({
  extends: Error,
  constructor({ message, status, error }) {
    this.super(message);
    this.name = this.constructor.name;
    this.message = message || 'Oops! Something is wrong';
    this.status = status;
    this.error = error;
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
   * @param {boolean} error - An Error Object.
   */
  constructor({ message, status = httpStatus.INTERNAL_SERVER_ERROR, error }) {
    super({ message, status, error });
  }

  static errorVerifyEmail() {
    return new APIError({
      message: 'Error Verify Email',
      status: httpStatus.ORIGIN_IS_UNREACHABLE,
      error: generateError('ORIGIN_IS_UNREACHABLE', 'Oops! Something is wrong', 'The verification was not successful!')
    });
  }

  static errorAlreadyVerifiedEmail() {
    return new APIError({
      message: 'Error Verify Email',
      status: httpStatus.FORBIDDEN,
      error: generateError('FORBIDDEN', 'Oops! Something is wrong', 'The user email is already verified!')
    });
  }

  static resourceNotFound() {
    return new APIError({
      message: 'Resource not found!',
      status: httpStatus.NOT_FOUND,
      error: generateError('NOT_FOUND', 'Oops! Something is wrong', 'The resource you are looking for does not exist!')
    });
  }

  static notUpdated() {
    return new APIError({
      message: 'Resource not Updated!',
      status: httpStatus.NOT_MODIFIED,
      error: generateError('NOT_MODIFIED', 'Oops! Something is wrong', 'The resource is not updated!')
    });
  }

  static userNotFound() {
    return new APIError({
      message: 'User not found!',
      status: httpStatus.NOT_FOUND,
      error: generateError('USER_NOT_FOUND', 'Oops! Something is wrong', 'The user you are looking for does not exist!')
    });
  }

  static userAlreadyExists() {
    return new APIError({
      message: 'User already exits!',
      status: httpStatus.CONFLICT,
      error: generateError('USER_CONFLICT', 'Oops! Something is wrong', 'Can not create new user with these attributes!')
    });
  }

  static outletAlreadyExists() {
    return new APIError({
      message: 'Outlet already exits!',
      status: httpStatus.CONFLICT,
      error: generateError('OUTLET_CONFLICT', 'Oops! Something is wrong', 'The user already have registered an outlet!')
    });
  }

  static invalidPassword() {
    return new APIError({
      message: 'Password does not match!',
      status: httpStatus.UNAUTHORIZED,
      error: generateError('UNAUTHORIZED', 'Invalid Password', 'Wrong password was supplied!')
    });
  }

  static invalidCredentials() {
    return new APIError({
      message: 'Invalid email or password!',
      status: httpStatus.UNAUTHORIZED,
      error: generateError('UNAUTHORIZED', 'Invalid Password', 'Wrong password was supplied!')
    });
  }

  static forbidden() {
    return new APIError({
      message: 'Request forbidden!',
      status: httpStatus.FORBIDDEN,
      error: generateError('FORBIDDEN', 'Oops! Something is wrong', 'This resource is forbidden for such Authorization')
    });
  }

  static basRequest() {
    return new APIError({
      message: 'Bad Request!',
      status: httpStatus.BAD_REQUEST,
      error: generateError('BAD_REQUEST', 'Oops! Something is wrong', 'This is a bad request')
    });
  }


  static socialAuthFailed(message) {
    return new APIError({
      message: 'Social Auth Failed!',
      status: httpStatus.PRECONDITION_FAILED,
      error: generateError('PRECONDITION_FAILED', 'Oops! Something is wrong', message)
    });
  }

  static unauthorizedRequest() {
    return new APIError({
      message: 'Request Unauthorized!',
      status: httpStatus.UNAUTHORIZED,
      error: generateError('UNAUTHORIZED', 'Oops! Something is wrong', 'You are not authorized for the action')
    });
  }

  static onlyRefreshTokenIsAllowed() {
    return new APIError({
      message: 'Refresh Token is required for this Request!',
      status: httpStatus.UNAUTHORIZED,
      error: generateError('UNAUTHORIZED', 'Oops! Something is wrong', 'This Request is supposed to be made with Refresh Token')
    });
  }

  static unauthorized() {
    return APIError.withCode('UNAUTHORIZED', httpStatus.UNAUTHORIZED);
  }

  static withCode(code, status, errorAttributes) {
    const errorCode = code && appErrorCode[code] ? code : 'UNSPECIFIED';
    const _error = appErrorCode[errorCode];
    const errAttributes = errorAttributes || {};
    if (errorCode === 'UNSPECIFIED') {
      errAttributes.missingCode = code;
    }
    const error = generateError(errorCode, _error.title, _error.description);
    return new APIError({ message: _error.message || _error.title, status: status || 400, error });
  }
}

module.exports = {
  APIError,
  generateError
};
