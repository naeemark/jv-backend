const { OK } = require('@utils/helper');
const { getUser } = require('@services/user')


/**
 * get
 * @public
 */
exports.get = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const response = await getUser(authorization);
    return OK(res, 'Get User', response);
  } catch (error) {
    return next(error);
  }
};
