/**
 * User Service
 *
 */
const { auth } = require('@utils/auth');
const { getUser, createUser } = require('@services/repository')
const { APIError } = require('@utils/APIError');

const registerUser = async (authorization, userData) => {

  const {
    email,
    password,
    name,
    userType
  } = userData;

  const hashedPassword = auth.sha256(password);
  const { deviceId } = await auth.verifyToken(authorization);

  const existingUser = await getUser({ email });

  if (existingUser) {
    // return { authorization, userData, existingUser }
    // throw APIError.userAlreadyExists();
    // new Promise(() => { throw APIError.userAlreadyExists(); });    
  } else {
    const userParams = {
      email, password: hashedPassword, name, userType
    };
    const user = await createUser(userParams);
    const { accessToken, refreshToken } = await auth.generateAuthToken({ user, deviceId });
    return { accessToken, refreshToken, user };
  }
};

module.exports = { registerUser };
