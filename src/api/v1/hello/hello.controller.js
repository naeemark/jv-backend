const httpStatus = require('http-status');

/**
 * hello
 * @public
 */
exports.hello = async (req, res, next) => {
  res.status(httpStatus.OK);
  return res.json({
    responseCode: httpStatus.OK,
    responseMessage: 'OK',
    response: {}
  });
};
