const { OK } = require('@utils/helper');
const { updateOutlet } = require('@services/outlet');


/**
 * update
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const params = req.body;

    if (params.workingHours) {
      Object.keys(params.workingHours).forEach((key) => {
        if (params.workingHours[key] === null) params.workingHours[key] = [params.workingHours.default];
      });
    }

    const response = await updateOutlet(authorization, params);
    return OK(res, 'Update Outlet', response);
  } catch (error) {
    return next(error);
  }
};
