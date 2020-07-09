const httpStatus = require('http-status');
const { auth } = require('@utils/auth');
const { OK } = require('@utils/helper');
const logger = require('@utils/logger');
const { APIError } = require('@utils/APIError')

/**
 * start
 * @public
 */
exports.start = async (req, res, next) => {

  const clientAppToken = req.headers['client-app-token'];
  const timestamp = req.headers.timestamp.toString();
  const deviceId = req.headers['device-id'];
  logger.info('SessionInfo', { deviceId, timestamp, clientAppToken });

  let response = null;

  if (auth.isTokenValid(clientAppToken, timestamp)) {
    response = await auth.generateAuthToken({ deviceId });
  }

  res.status(httpStatus.OK);
  return res.json({
    responseCode: httpStatus.OK,
    responseMessage: 'OK',
    response: response,
    time: new Date()
  });
};
