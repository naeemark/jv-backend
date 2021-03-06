/**
 * User Service
 *
 */
const { auth } = require('@utils/auth');
const { userRepository } = require('@services/repository');
const { APIError } = require('@utils/APIError');

const registerUser = async (deviceId, userData) => {
  const {
    email, password, name, userType, mobile
  } = userData;
  const hashedPassword = auth.sha256(password);

  const existingUser = await userRepository.retrieve({ email });

  if (existingUser) {
    throw APIError.userAlreadyExists();
  } else {
    const user = await userRepository.create({
      email, password: hashedPassword, name, userType, mobile
    });
    const { accessToken, refreshToken } = await auth.generateAuthToken({ user, deviceId });
    return { accessToken, refreshToken, user };
  }
};

const loginUser = async (deviceId, userData) => {
  const { email, password } = userData;
  const hashedPassword = auth.sha256(password);

  const user = await userRepository.retrieve({ email });

  if (user && user.password === hashedPassword) {
    delete user.password;
    const { accessToken, refreshToken } = await auth.generateAuthToken({ user, deviceId });
    return { accessToken, refreshToken, user };
  }
  throw APIError.invalidCredentials();
};


const getUser = async (authorization) => {
  const { user } = await auth.verifyToken(authorization);
  if (!user) throw APIError.forbidden();

  const retrievedUser = await userRepository.retrieve({ email: user.email });
  if (retrievedUser) return retrievedUser;
  throw APIError.userNotFound();
};

const userService = () => { };
module.exports = {
  userService, registerUser, loginUser, getUser
};
