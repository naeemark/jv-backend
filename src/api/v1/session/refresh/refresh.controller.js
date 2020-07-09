const httpStatus = require('http-status');

/**
 * refresh
 * @public
 */
exports.refresh = async (req, res, next) => {
  res.status(httpStatus.OK);
  return res.json({
    responseCode: httpStatus.OK,
    responseMessage: 'OK',
    response: req.headers
  });
};
