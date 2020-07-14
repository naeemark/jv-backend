const { OK } = require('@utils/helper');
const httpStatus = require('http-status');
const { loginUser } = require('@services/user')

/**
 * login
 * @public
 */
exports.login = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const response = await loginUser(authorization, req.body);
    return OK(res, 'Login Successful', response);
  } catch (error) {
    return next(error);
  }
};
