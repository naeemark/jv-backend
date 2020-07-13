const httpStatus = require('http-status');
const { auth } = require('@utils/auth');
const logger = require('@utils/logger');

/**
 * refresh
 * @public
 */
exports.refresh = async (req, res, next) => {

  const deviceId = req.headers['device-id'];
  const response = await auth.generateAuthToken({ deviceId });

  res.status(httpStatus.OK);
  return res.json({
    responseCode: httpStatus.OK,
    responseMessage: 'OK',
    response: response
  });
};
