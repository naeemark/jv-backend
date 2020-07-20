/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const app = require('@config/app');

describe('GET /api/health', () => {
  let body;

  beforeEach(() => {
    jest.useFakeTimers();
    body = {};
  });

  afterEach(() => { });

  it('should integrate api /health', () => {
    return request(app)
      .get('/api/health')
      .send(body)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body).toHaveProperty('responseCode');
        expect(res.body).toHaveProperty('responseMessage');
        expect(res.body.responseCode).toBe(200);
        expect(res.body.responseMessage).not.toBe(undefined);
      });
  });
});
