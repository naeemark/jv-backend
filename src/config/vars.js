require('path');

// import .env variables
require('dotenv-safe').config();

module.exports = {
  stage: process.env.STAGE,
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  serviceName: 'jv-backend',
  clientAuthKey: process.env.CLIENT_AUTH_KEY,
  dynamoTableName: process.env.DYNAMO_TABLE_NAME,
  jwtSetting: {
    accessTokenExpiryTime: process.env.JWT_EXPIRATION_TIME,
    refreshTokenExpiryTime: process.env.JWT_REFRESH_EXPIRATION_TIME,
    jwtTokenSecret: process.env.JWT_SECRET
  },
  http: {
    timeout: 5000,
    responseType: 'json',
    responseEncoding: 'utf8',
    retries: 3
  }
};
