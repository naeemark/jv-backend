const { OK } = require('@utils/helper');
const { getOutlet } = require('@services/outlet');

/**
 * read
 * @public
 */
exports.read = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const response = await getOutlet(authorization);
    return OK(res, 'Get Outlet', response);
  } catch (error) {
    return next(error);
  }
};
