/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const app = require('@app');

describe('POST /api/v1/outlets', () => {
  let body;

  beforeEach(() => {
    body = {};
  });

  afterEach(() => { });

  it('should integrate api /outlet/create without header', () => {
    return request(app)
      .post('/api/v1/outlets')
      .send(body)
      .expect(httpStatus.FORBIDDEN);
  });
});
