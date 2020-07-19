/**
 * Repository Service
 *
 */

const User = require("../../models/User");
const { APIError } = require('@utils/APIError');


const createUser = async (userEntity) => {
  try {
    const email = userEntity.email;
    userEntity['entitySortKey'] = `#USR-EMAIL#${email}`;
    await User.create(userEntity);
    const user = await retrieveUser({ email });
    delete user.password;
    return user;
  } catch (error) {
    console.error(error);
    throw APIError.unauthorized();
  }
};

const retrieveUser = async ({ email }) => {
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
    throw APIError.userNotFound();
  }
};

const repositoryService = () => { };

module.exports = { repositoryService, createUser, retrieveUser };
