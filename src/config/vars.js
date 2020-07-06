const path = require('path');

// import .env variables
require('dotenv-safe').config({
  example: process.env.CI ? '.env.ci.example' : '.env.example'
});

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
