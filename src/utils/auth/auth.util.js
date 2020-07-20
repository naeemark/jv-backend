const logger = require('@utils/logger');
const cryptoJS = require('crypto-js');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { APIError } = require('@utils/APIError');
const { clientAuthKey, jwtSetting } = require('@config/vars');


/**
 * Function to generate JWT Tokens
 * @param {Object} payload  Payload to be signed
 * @returns {Object} returns object with tokens { token, refreshToken }
 */
const generateAuthToken = async (payload) => {
  payload.type = 'access'; // eslint-disable-line
  const accessToken = sign(payload, { expiresIn: jwtSetting.accessTokenExpiryTime });
  payload.type = 'refresh'; // eslint-disable-line
  const refreshToken = sign(payload, { expiresIn: jwtSetting.refreshTokenExpiryTime });
  return { accessToken, refreshToken };
};

/**
 * Function to generate JWT Tokens for Webpages
 * @param {Object} payload  Payload to be signed
 * @returns {Object} returns object with token { token }
 */
const generateWebPageAuthToken = async (payload) => {
  const accessToken = sign(payload, { expiresIn: jwtSetting.webPageAuthExpiry });
  return { accessToken };
};

/**
 * Function verify JWT Signature
 * @param {String} accessToken      JWT Token to be verified
 * @returns {Promise} returns Promise with decoded accessToken
 */
const verifyToken = async (accessToken) => {
  if (_.isEmpty(accessToken)) {
    throw APIError.unauthorized();
  }

  try {
    return jwt.verify(accessToken, jwtSetting.jwtTokenSecret);
  } catch (e) {
    throw APIError.unauthorized();
  }
};

const sign = (payload, options) => jwt.sign(payload, jwtSetting.jwtTokenSecret, options);

/**
 * Function validate accessToken
 * @param {String} accessToken
 * @param {String} timestamp
 * @returns {Boolean} return true or false
 */
const isTokenValid = (accessToken, timestamp) => {
  logger.info('isTokenValid', { accessToken, timestamp });
  if (_.isEmpty(accessToken) || _.isEmpty(timestamp)) {
    throw APIError.unauthorized();
  }
  return sha256(encodeURI(timestamp + clientAuthKey)) === accessToken;
};

/**
 * Generates SHA_256 Hash
 * @param {String} dataString     String to be hashed
 * @returns {String} returns Hash
 */
const sha256 = dataString => cryptoJS.SHA256(dataString).toString(cryptoJS.enc.Base64);

/**
 * Generates AES Encrypted String
 * @param {String} dataString     String to be encrypted
 * @returns {String} returns  AES Encrypted String
 */
const encryptAES = dataString => cryptoJS.AES.encrypt(dataString, jwtSetting.jwtTokenSecret).toString();

/**
 * Decrypts AES Encrypted String
 * @param {String} encodedDataString  String to be decrypted
 * @returns {String} returns decrypted String
 */
const decryptAES = encodedDataString => cryptoJS.AES.decrypt(encodedDataString, jwtSetting.jwtSecretToken).toString(cryptoJS.enc.Utf8);

module.exports = {
  generateAuthToken,
  generateWebPageAuthToken,
  verifyToken,
  sign,
  isTokenValid,
  sha256,
  encryptAES,
  decryptAES
};
