/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const app = require('@app');

describe('POST /api/v1/user/register', () => {
  let body;

  beforeEach(() => {
    jest.useFakeTimers();
    body = {};
  });

  afterEach(() => { });

  it('should integrate api /user/register without header', () => {
    return request(app)
      .post('/api/v1/user/register')
      .send(body)
      .expect(httpStatus.BAD_REQUEST);
  });


  // it('should integrate api /user/register', () => {
  //   return request(app)
  //     .post('/api/v1/user/register')
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
