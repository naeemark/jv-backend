const httpStatus = require('http-status');
const { registerUser } = require('@services/user')

/**
 * register
 * @public
 */
exports.register = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const response = await registerUser(authorization, req.body);

  if (response) {
    res.status(httpStatus.OK);
    return res.json({
      responseCode: httpStatus.OK,
      responseMessage: 'OK',
      response: response
    });
  }
  res.status(httpStatus.CONFLICT);
  return res.json({
    responseCode: httpStatus.CONFLICT,
    responseMessage: 'User Already Exists',
    response: null
  });
};
