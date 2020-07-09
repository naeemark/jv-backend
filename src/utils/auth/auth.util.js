const logger = require('@utils/logger');
const cryptoJS = require('crypto-js');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { APIError } = require('@utils/APIError');
const { clientAuthKey, jwtSetting } = require('@config/vars');

const PRINCIPAL_ID = 'user';

/**
 * Function to generate JWT Tokens
 * @param {Object} payload  Payload to be signed
 * @returns {Object} returns object with tokens { token, refreshToken }
 */
const generateAuthToken = async (payload) => {
  const accessToken = sign(payload, { expiresIn: jwtSetting.accessTokenExpiryTime });
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
    return jwt.verify(accessToken, jwtSetting.jwtSecretToken);
  } catch (e) {
    throw APIError.unauthorized();
  }
};

const sign = (payload, options) => jwt.sign(payload, jwtSetting.jwtSecretToken, options);

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
 * Generates Lambda Authorizer Policy
 * @param {String} principalId  PrincipleID
 * @param {String} effect      'Allow' or 'Deny'
 * @param {String} resource     Resource Arn
 * @returns {Object} returns AWS Authorizer Policy
 */
const generateAuthPolicy = (principalId, effect, payload) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  const policyDocument = {};
  policyDocument.Version = '2012-10-17';
  policyDocument.Statement = [];
  const statementOne = {};
  statementOne.Action = 'execute-api:Invoke';
  statementOne.Effect = effect;
  statementOne.Resource = '*';
  policyDocument.Statement[0] = statementOne;
  authResponse.policyDocument = policyDocument;

  authResponse.context = payload;

  return authResponse;
};

/**
 * Generates ALLOW Lambda Authorizer Policy
 * @returns {Object} returns AWS Authorizer Policy
 */
const generateAuthAllowPolicy = () => generateAuthPolicy(PRINCIPAL_ID, 'Allow', {});

/**
 * Generates DENY Lambda Authorizer Policy
 * @returns {Object} returns AWS Authorizer Policy
 */
const generateAuthDenyPolicy = () => generateAuthPolicy(PRINCIPAL_ID, 'Deny', {});

/**
 * Generates AES Encrypted String
 * @param {String} dataString     String to be encrypted
 * @returns {String} returns  AES Encrypted String
 */
const encryptAES = dataString => cryptoJS.AES.encrypt(dataString, jwtSetting.jwtSecretToken).toString();

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
  generateAuthAllowPolicy,
  generateAuthDenyPolicy,
  encryptAES,
  decryptAES
};
