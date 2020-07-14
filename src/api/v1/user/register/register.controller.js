const httpStatus = require('http-status');
const { OK } = require('@utils/helper');
const { registerUser } = require('@services/user')

/**
 * register
 * @public
 */
exports.register = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const response = await registerUser(authorization, req.body);
    return OK(res, 'Register Successful', response);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
