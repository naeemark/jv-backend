const { OK } = require('@utils/helper');
const { loginUser } = require('@services/user');

/**
 * login
 * @public
 */
exports.login = async (req, res, next) => {
  try {
    const deviceId = req.headers['device-id'];
    const response = await loginUser(deviceId, req.body);
    return OK(res, 'Login Successful', response);
  } catch (error) {
    return next(error);
  }
};
