/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const app = require('@app');

describe('POST /api/v1/outlets', () => {
  let body;

  beforeEach(() => {
    jest.useFakeTimers();
    body = {
      name: 'John\'s Center',
      mobile: '+123456789',
      email: 'center@jvbackend.com',
      url: 'www.my-center.com',
      seatCapacity: '5',
      cnic: '123456789012'
    };
  });

  afterEach(() => { });

  it('should integrate api /outlets without header', () => {
    return request(app)
      .post('/api/v1/outlets')
      .send(body)
      .expect(httpStatus.BAD_REQUEST);
  });
});
