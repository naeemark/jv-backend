const { OK } = require('@utils/helper');
const { registerUser } = require('@services/user');

/**
 * register
 * @public
 */
exports.register = async (req, res, next) => {
  try {
    const deviceId = req.headers['device-id'];
    const response = await registerUser(deviceId, req.body);
    return OK(res, 'Register Successful', response);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
