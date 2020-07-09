/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const app = require('@config/app');

describe('POST /api/v1/session/start', () => {
  let body;

  beforeEach(() => {
    body = {};
  });

  afterEach(() => { });

  it('should integrate api /session/start', () => {
    return request(app)
      .post('/api/v1/session/start')
      .set({
        'timestamp': '20190612040104',
        'client-app-token': 'xJIv/hKVzX3U1lPHFEp2eCF7py9uEcQmzHRaTfSI3ZM=',
        'device-id': '123'
      })
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
