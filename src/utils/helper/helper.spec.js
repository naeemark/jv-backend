/* eslint-disable arrow-body-style */
const httpStatus = require('http-status');
const MockRes = require('mock-express-response');
const { APIError } = require('@utils/APIError');
const util = require('./helper.util');

describe('Utility - helper', () => {
  beforeEach(() => { });

  afterEach(() => { });

  it('should return OK response', () => {
    const res = new MockRes();
    const status = jest.spyOn(res, 'status');
    const json = jest.spyOn(res, 'json');
    util.OK(res);
    expect(status).toBeCalledWith(httpStatus.OK);
    expect(json).toBeCalledWith(expect.objectContaining({
      responseCode: httpStatus.OK,
      responseMessage: expect.any(String)
    }));
  });

  it('should return the API error with status code 101', () => {
    const apiError = util.handleApiError(APIError.withCode('UNKNOWN', 101));
    expect(apiError).toHaveProperty('name');
    expect(apiError).toHaveProperty('error');
    expect(apiError).toHaveProperty('status');
    expect(apiError.name).toBe('APIError');
    expect(apiError.status).toBe(101);
  });

  it('should return the API error with errorCode UNSPECIFIED', () => {
    const apiError = util.handleApiError({});
    expect(apiError).toHaveProperty('name');
    expect(apiError).toHaveProperty('error');
    expect(apiError).toHaveProperty('status');
    expect(apiError.error).toHaveProperty('errorCode');
    expect(apiError.name).toBe('APIError');
    expect(apiError.status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
    expect(apiError.error.errorCode).toBe('UNSPECIFIED');
  });

  it('should return the API error with errorcode EXTERNAL_SERVICE_TIMEOUT', () => {
    const apiError = util.handleApiError({ code: 'ECONNABORTED', request: {} });
    expect(apiError).toHaveProperty('name');
    expect(apiError).toHaveProperty('error');
    expect(apiError).toHaveProperty('status');
    expect(apiError.error).toHaveProperty('errorCode');
    expect(apiError.name).toBe('APIError');
    expect(apiError.status).toBe(httpStatus.GATEWAY_TIMEOUT);
    expect(apiError.error.errorCode).toBe('EXTERNAL_SERVICE_TIMEOUT');
  });

  it('should return the API error with errorcode EXTERNAL_SERVICE_INVALID_RESPONSE', () => {
    const apiError = util.handleApiError({ request: {} });
    expect(apiError).toHaveProperty('name');
    expect(apiError).toHaveProperty('error');
    expect(apiError).toHaveProperty('status');
    expect(apiError.error).toHaveProperty('errorCode');
    expect(apiError.name).toBe('APIError');
    expect(apiError.status).toBe(httpStatus.BAD_GATEWAY);
    expect(apiError.error.errorCode).toBe('EXTERNAL_SERVICE_INVALID_RESPONSE');
  });

  it('should return the API error with errorcode UNAUTHORIZED', () => {
    const apiError = util.handleApiError({ response: { status: httpStatus.UNAUTHORIZED } });
    expect(apiError).toHaveProperty('name');
    expect(apiError).toHaveProperty('error');
    expect(apiError).toHaveProperty('status');
    expect(apiError.error).toHaveProperty('errorCode');
    expect(apiError.name).toBe('APIError');
    expect(apiError.status).toBe(httpStatus.UNAUTHORIZED);
    expect(apiError.error.errorCode).toBe('UNAUTHORIZED');
  });

  it('should return the API error with errorcode FORBIDDEN', () => {
    const apiError = util.handleApiError({ response: { status: httpStatus.FORBIDDEN } });
    expect(apiError).toHaveProperty('name');
    expect(apiError).toHaveProperty('error');
    expect(apiError).toHaveProperty('status');
    expect(apiError.error).toHaveProperty('errorCode');
    expect(apiError.name).toBe('APIError');
    expect(apiError.status).toBe(httpStatus.FORBIDDEN);
    expect(apiError.error.errorCode).toBe('FORBIDDEN');
  });

  it('should return the API error with errorcode NOT_FOUND', () => {
    const apiError = util.handleApiError({ response: { status: httpStatus.NOT_FOUND } });
    expect(apiError).toHaveProperty('name');
    expect(apiError).toHaveProperty('error');
    expect(apiError).toHaveProperty('status');
    expect(apiError.error).toHaveProperty('errorCode');
    expect(apiError.name).toBe('APIError');
    expect(apiError.status).toBe(httpStatus.NOT_FOUND);
    expect(apiError.error.errorCode).toBe('NOT_FOUND');
  });

  it('should return the API error with errorcode EXTERNAL_SERVICE_FAILURE', () => {
    const apiError = util.handleApiError({ response: { status: httpStatus.BAD_REQUEST } });
    expect(apiError).toHaveProperty('name');
    expect(apiError).toHaveProperty('error');
    expect(apiError).toHaveProperty('status');
    expect(apiError.error).toHaveProperty('errorCode');
    expect(apiError.name).toBe('APIError');
    expect(apiError.status).toBe(httpStatus.BAD_REQUEST);
    expect(apiError.error.errorCode).toBe('EXTERNAL_SERVICE_FAILURE');
  });

  it('should generate cacheKey for string', () => {
    const cacheKey = util.generateMd5CacheKey('key', 'ok');
    expect(cacheKey).toBeString();
  });

  it('should generate cacheKey for object', () => {
    const cacheKey = util.generateMd5CacheKey('key', { value: 'ok' });
    expect(cacheKey).toBeString();
  });

  it('should generate cacheKey for empty key', () => {
    const cacheKey = util.generateMd5CacheKey();
    expect(cacheKey).toBeString();
  });
});
