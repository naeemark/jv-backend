/* eslint-disable arrow-body-style */

const httpStatus = require('http-status');
const { Request } = require('jest-express/lib/request');
const { Response } = require('jest-express/lib/response');
const toBeType = require('jest-tobetype');

expect.extend(toBeType);

const { ValidationError } = require('express-validation');
const {
  converter,
  generateNotFoundError,
  convertGenericError,
  convertValidationError,
  notFound,
  handler
} = require('./error');

describe('Middleware - error', () => {
  const req = new Request('/api/v1/auth/login', {
    method: 'PUT'
  });
  const res = new Response();
  const validationError = new ValidationError([{
    location: 'body',
    messages: ['"nonce" is required'],
    types: ['any.required']
  }], {
    flatten: true,
    status: 400,
    statusText: 'validation error'
  });
  let statusStub;
  let jsonStub;
  let endStub;

  beforeEach(() => {
    jest.useFakeTimers();
    statusStub = jest.spyOn(res, 'status');
    jsonStub = jest.spyOn(res, 'json');
    endStub = jest.spyOn(res, 'end');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should convert validation error into API error with custom route', () => {
    req.path = '/api/v1/auth/error';
    const route = 'root';
    validationError.route = route;
    const apiError = convertValidationError(validationError, req);

    expect(apiError).toHaveProperty('name');
    expect(apiError).toHaveProperty('status');
    expect(apiError).toHaveProperty('error');
    expect(apiError.name).toBe('APIError');
    expect(apiError.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should convert validation error into API error with default route', () => {
    req.path = '/api/v1/auth/error';

    delete validationError.route;
    const apiError = convertValidationError(validationError, req);

    expect(apiError).toHaveProperty('name');
    expect(apiError).toHaveProperty('status');
    expect(apiError).toHaveProperty('error');
    expect(apiError.name).toBe('APIError');
    expect(apiError.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should convert generic error into API error', () => {
    req.path = '/api/v1/auth/error';
    const error = new Error('Something went wrong');

    const apiError = convertGenericError(error, req);
    expect(apiError).toHaveProperty('name');
    expect(apiError).toHaveProperty('status');
    expect(apiError).toHaveProperty('error');
    expect(apiError.name).toBe('APIError');
    expect(apiError.status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
  });


  it('should generate Not Found API error', () => {
    const apiError = generateNotFoundError();
    expect(apiError).toHaveProperty('name');
    expect(apiError).toHaveProperty('status');
    expect(apiError).toHaveProperty('error');
    expect(apiError.name).toBe('APIError');
    expect(apiError.status).toBe(httpStatus.NOT_FOUND);
  });


  it('error converter should convert validation error', () => {
    converter(validationError, req, res);

    expect(statusStub).toBeCalledWith(httpStatus.BAD_REQUEST);
    expect(jsonStub).toHaveBeenCalledTimes(1);
    expect(endStub).toHaveBeenCalledTimes(1);
  });

  it('error converter should convert generic error', () => {
    const error = new Error('Something went wrongasdasdasddsa');
    converter(error, req, res);

    expect(statusStub).toBeCalledWith(httpStatus.INTERNAL_SERVER_ERROR);
    expect(jsonStub).toHaveBeenCalledTimes(1);
    expect(endStub).toHaveBeenCalledTimes(1);
  });

  it('error converter should convert APIError', () => {
    const error = convertValidationError(validationError, req);
    converter(error, req, res);

    expect(statusStub).toBeCalledWith(httpStatus.BAD_REQUEST);
    expect(jsonStub).toHaveBeenCalledTimes(1);
    expect(endStub).toHaveBeenCalledTimes(1);
  });

  it('notFound middleware should generate not found error', () => {
    notFound(req, res);

    expect(statusStub).toBeCalledWith(httpStatus.NOT_FOUND);
    expect(jsonStub).toHaveBeenCalledTimes(1);
    expect(endStub).toHaveBeenCalledTimes(1);
  });

  it('handler middleware should return http status message for error without message', () => {
    const err = new Error();
    err.status = httpStatus.INTERNAL_SERVER_ERROR;
    handler(err, req, res);

    expect(statusStub).toBeCalledWith(httpStatus.INTERNAL_SERVER_ERROR);
    expect(jsonStub).toHaveBeenCalledTimes(1);
    expect(endStub).toHaveBeenCalledTimes(1);
  });

  it('handler middleware should return error with error stack', () => {
    const err = new Error();
    err.status = httpStatus.INTERNAL_SERVER_ERROR;
    process.env.NODE_ENV = 'development';
    handler(err, req, res);

    expect(statusStub).toBeCalledWith(httpStatus.INTERNAL_SERVER_ERROR);
    expect(jsonStub).toHaveBeenCalledTimes(1);
    expect(endStub).toHaveBeenCalledTimes(1);
  });

  it('handler middleware should return error without error stack', () => {
    const err = new Error();
    err.status = httpStatus.INTERNAL_SERVER_ERROR;
    process.env.NODE_ENV = 'test';
    handler(err, req, res);

    expect(statusStub).toBeCalledWith(httpStatus.INTERNAL_SERVER_ERROR);
    expect(jsonStub).toHaveBeenCalledTimes(1);
    expect(endStub).toHaveBeenCalledTimes(1);
  });

  it('handler middleware should convert error with http status = 0, into internal server error', () => {
    const err = new Error();
    err.status = 0;
    handler(err, req, res);

    expect(statusStub).toBeCalledWith(httpStatus.INTERNAL_SERVER_ERROR);
    expect(jsonStub).toHaveBeenCalledTimes(1);
    expect(endStub).toHaveBeenCalledTimes(1);
  });
});
