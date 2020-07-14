/**
 * Repository Service
 *
 */

const User = require("../../models/User");
const { APIError } = require('@utils/APIError');


const createUser = async ({ email, name, password, userType }) => {
  try {
    const entitySortKey = `#USR-EMAIL#${email}`;
    await User.create({ entitySortKey, email, name, password, userType });
    const user = await getUser({ email });
    delete user.password;
    return user;
  } catch (error) {
    console.error(error);
    throw APIError.unauthorized();
  }
};

const getUser = async ({ email }) => {
  try {
    const entityHashKey = '#JV-USER#';
    const entitySortKey = `#USR-EMAIL#${email}`;
    const user = await User.get({ entityHashKey, entitySortKey });
    if (user) {
      delete user.entityHashKey;
      delete user.entitySortKey;
    }
    return user;
  } catch (error) {
    console.error(error);
    throw APIError.unauthorized();
  }
};

const repositoryService = () => { };

module.exports = { repositoryService, createUser, getUser };
