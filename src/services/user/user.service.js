/**
 * User Service
 *
 */
const { auth } = require('@utils/auth');
const { getUser, createUser } = require('@services/repository')
const { APIError } = require('@utils/APIError');

const registerUser = async (authorization, userData) => {

  const { email, password, name, userType, mobile } = userData;

  const hashedPassword = auth.sha256(password);
  const { deviceId } = await auth.verifyToken(authorization);

  const existingUser = await getUser({ email });

  if (existingUser) {
    throw APIError.userAlreadyExists();
  } else {
    const user = await createUser({ email, password: hashedPassword, name, userType, mobile });
    const { accessToken, refreshToken } = await auth.generateAuthToken({ user, deviceId });
    return { accessToken, refreshToken, user };
  }
};


const loginUser = async (authorization, userData) => {
  const { email, password, } = userData;

  const hashedPassword = auth.sha256(password);
  const { deviceId } = await auth.verifyToken(authorization);

  const user = await getUser({ email });

  if (user && user.password === hashedPassword) {
    delete user.password;
    const { accessToken, refreshToken } = await auth.generateAuthToken({ user, deviceId });
    return { accessToken, refreshToken, user };
  }
  throw APIError.invalidCredentials();
};

const userService = () => { };
module.exports = { userService, registerUser, loginUser };
