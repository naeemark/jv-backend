const { OK } = require('@utils/helper');
const { createOutlet } = require('@services/outlet');

/**
 * create
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const params = req.body;

    Object.keys(params.workingHours).forEach((key) => {
      if (params.workingHours[key] === null) params.workingHours[key] = [params.workingHours.default];
    });

    const response = await createOutlet(authorization, params);
    return OK(res, 'Create Outlet', response);
  } catch (error) {
    return next(error);
  }
};
