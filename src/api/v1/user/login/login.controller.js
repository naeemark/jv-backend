const httpStatus = require('http-status');

/**
 * login
 * @public
 */
exports.login = async (req, res, next) => {
  res.status(httpStatus.OK);
  return res.json({
    responseCode: httpStatus.OK,
    responseMessage: 'OK',
    response: {}
  });
};
