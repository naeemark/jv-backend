const path = require('path');

// import .env variables
if (process.env.NODE_ENV !== 'test') require('dotenv-safe').config();

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  serviceName: 'jv-backend',
  http: {
    timeout: 5000,
    responseType: 'json',
    responseEncoding: 'utf8',
    retries: 3
  }
};
