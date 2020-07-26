/**
 * Outlet Repository
 *
 */

const { APIError } = require('@utils/APIError');
const Outlet = require('@models/Outlet');
const { dbConstants: { outletEntityHashKey, outletEntitySortKey } } = require('@utils/constants');


const create = async (entityObject) => {
  try {
    const { email } = entityObject;
    entityObject.entitySortKey = outletEntitySortKey(email);
    await Outlet.create(entityObject);
    return await retrieve({ email });
  } catch (error) {
    console.error(error);
    throw APIError.unauthorized();
  }
};

const retrieve = async ({ email }) => {
  try {
    const params = { entityHashKey: outletEntityHashKey, entitySortKey: outletEntitySortKey(email) };
    return await Outlet.get(params);
  } catch (error) {
    console.error(error);
    throw APIError.userNotFound();
  }
};

module.exports = { create, retrieve };
