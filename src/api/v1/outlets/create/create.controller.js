const { OK } = require('@utils/helper');

/**
 * create
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const response = { authorization, body: req.body };
    return OK(res, 'Create Outlet', response);
  } catch (error) {
    return next(error);
  }
};
