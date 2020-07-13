const httpStatus = require('http-status');
const { loginUser } = require('@services/user')

/**
 * login
 * @public
 */
exports.login = async (req, res, next) => {

  const authorization = req.headers.authorization;
  const response = await loginUser(authorization, req.body);

  if (response) {
    res.status(httpStatus.OK);
    return res.json({
      responseCode: httpStatus.OK,
      responseMessage: 'OK',
      response: response
    });
  }
  res.status(httpStatus.UNAUTHORIZED);
  return res.json({
    responseCode: httpStatus.UNAUTHORIZED,
    responseMessage: 'Wrong Email or Password',
    response: null
  });
};
