const { OK } = require('@utils/helper');
const { deleteOutlet } = require('@services/outlet');

/**
 * delete
 * @public
 */
exports.delete = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const response = await deleteOutlet(authorization);
    return OK(res, 'Delete Outlet', response);
  } catch (error) {
    return next(error);
  }
};
