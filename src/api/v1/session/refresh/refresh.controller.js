const { OK } = require('@utils/helper');
const { auth } = require('@utils/auth');

/**
 * refresh
 * @public
 */
exports.refresh = async (req, res, next) => {
  try {
    const deviceId = req.headers['device-id'];
    const response = await auth.generateAuthToken({ deviceId });
    return OK(res, 'Refresh Session', response);
  } catch (error) {
    return next(error);
  }
};
