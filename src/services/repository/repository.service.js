/**
 * Repository Service
 *
 */

const { APIError } = require('@utils/APIError');
const User = require('../../models/User');


const createUser = async (userEntity) => {
  try {
    const { email } = userEntity;
    userEntity.entitySortKey = `#USR-EMAIL#${email}`; // eslint-disable-line
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
