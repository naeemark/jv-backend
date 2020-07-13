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
    return await getUser({ email });
  } catch (error) {
    console.error(error);
    // throw APIError.unauthorized();
    return null;
  }
};

const getUser = async ({ email }) => {
  try {
    const entityHashKey = '#JV-USER#';
    const entitySortKey = `#USR-EMAIL#${email}`;
    const user = await User.get({ entityHashKey, entitySortKey });
    delete user.entityHashKey;
    delete user.entitySortKey;
    delete user.password;
    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const repositoryService = () => { };

module.exports = { repositoryService, createUser, getUser };
