const { OK } = require('@utils/helper');
const { loginUser } = require('@services/user');

/**
 * login
 * @public
 */
exports.login = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const response = await loginUser(authorization, req.body);
    return OK(res, 'Login Successful', response);
  } catch (error) {
    return next(error);
  }
};
