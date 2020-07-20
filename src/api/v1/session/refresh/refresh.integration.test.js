/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const app = require('@config/app');

describe('POST /api/v1/session/refresh', () => {
  let body;

  beforeEach(() => {
    jest.useFakeTimers();
    body = {};
  });

  afterEach(() => { });

  it('should integrate api /session/refresh', () => {
    return request(app)
      .post('/api/v1/session/refresh')
      .send(body)
      // .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body).toHaveProperty('responseCode');
        expect(res.body).toHaveProperty('responseMessage');
        expect(res.body.responseCode).toBe(400);
        expect(res.body.responseMessage).not.toBe(undefined);
      });
  });
});
