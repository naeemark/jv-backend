const { auth } = require('@utils/auth');
const { OK } = require('@utils/helper');
const logger = require('@utils/logger');
const { APIError } = require('@utils/APIError');

/**
 * start
 * @public
 */
exports.start = async (req, res, next) => {
  try {
    const clientAppToken = req.headers['client-app-token'];
    const timestamp = req.headers.timestamp.toString();
    const deviceId = req.headers['device-id'];
    logger.info('SessionInfo', { deviceId, timestamp, clientAppToken });

    if (auth.isTokenValid(clientAppToken, timestamp)) {
      response = await auth.generateAuthToken({ deviceId });
      return OK(res, 'Start Session', response);
    }
    throw APIError.unauthorizedRequest()
  } catch (error) {
    return next(error);
  }
};
