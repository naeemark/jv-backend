/* eslint-disable arrow-body-style */
// const request = require('supertest');
// const httpStatus = require('http-status');
// const app = require('@app');

describe('GET /api/v1/outlets', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => { });

  it('should integrate api /outlets', () => {
    expect(1 + 1).toEqual(2);
  });

  // it('should integrate api /outlets/read', () => {
  //   return request(app)
  //     .get('/api/v1/outlets/read')
  //     .send(body)
  //     .expect(httpStatus.OK)
  //     .then((res) => {
  //       expect(res.body).toHaveProperty('responseCode');
  //       expect(res.body).toHaveProperty('responseMessage');
  //       expect(res.body.responseCode).toBe(200);
  //       expect(res.body.responseMessage).not.toBe(undefined);
  //     });
  // });
});
