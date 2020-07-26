/**
 * User Repository
 *
 */

const { APIError } = require('@utils/APIError');
const { User } = require('@models');
const { dbConstants: { userEntityHashKey, userEntitySortKey } } = require('@utils/constants');


const create = async (entityObject) => {
  try {
    const { email } = entityObject;
    entityObject.entitySortKey = userEntitySortKey(email);
    await User.create(entityObject);
    const user = await retrieve({ email });
    delete user.password;
    return user;
  } catch (error) {
    console.error(error);
    throw APIError.unauthorized();
  }
};

const retrieve = async ({ email }) => {
  try {
    const params = { entityHashKey: userEntityHashKey, entitySortKey: userEntitySortKey(email) };
    const user = await User.get(params);
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

module.exports = { create, retrieve };
