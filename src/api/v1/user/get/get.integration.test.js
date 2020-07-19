/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const app = require('@config/app');

describe('POST /api/v1/user/get', () => {
  let body;

  beforeEach(() => {
    body = {};
  });

  afterEach(() => { });

  it('should integrate api /user without authorization', () => {
    return request(app)
      .get('/api/v1/user')
      .send(body)
      .expect(httpStatus.FORBIDDEN);
  });
});
