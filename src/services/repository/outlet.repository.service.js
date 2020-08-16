/**
 * Outlet Repository
 *
 */

const { APIError } = require('@utils/APIError');
const { dbConstants: { outletEntityHashKey, outletEntitySortKey } } = require('@utils/constants');
const dynamodbService = require('@services/dynamodb');
const { dynamoTableName: TableName } = require('@config/vars');

/**
 * Creates a new Outlet
 *
 * @param {*} Item
 */
const create = async (Item) => {
  try {
    const { createdBy } = Item;
    Item.entityHashKey = outletEntityHashKey;
    Item.entitySortKey = outletEntitySortKey(createdBy);
    Item.createdAt = new Date(new Date().toUTCString()) / 1000;
    Item.updatedAt = Item.createdAt;
    const requestParams = { TableName, Item };
    const created = await dynamodbService.createItem(requestParams);
    delete created.entityHashKey;
    delete created.entitySortKey;
    return created;
  } catch (error) {
    console.error(error);
    if (error.status === 409) { throw APIError.outletAlreadyExists(); }
    throw APIError.unspecified();
    // throw handleDynamoDbError(err, 'DYNAMODB_FAILURE');
  }
};

/**
 * Gets the outlet for the user
 * @param {*} createdBy - Email
 */
const read = async ({ createdBy }) => {
  try {
    const params = { TableName, Key: { entityHashKey: outletEntityHashKey, entitySortKey: outletEntitySortKey(createdBy) } };
    const item = await dynamodbService.readItem(params);
    if (item) {
      delete item.entityHashKey;
      delete item.entitySortKey;
      return item;
    }
    throw APIError.resourceNotFound();
  } catch (error) {
    console.error(error);
    throw APIError.resourceNotFound();
  }
};

/**
 * Updates existing Outlet
 * @param {*} Item
 */
const update = async (Item) => {
  try {
    Item.updatedAt = new Date(new Date().toUTCString()) / 1000;
    const Key = { entityHashKey: outletEntityHashKey, entitySortKey: outletEntitySortKey(Item.createdBy) };
    await dynamodbService.updateItem({ TableName, Key, Item });
  } catch (error) {
    console.error(error);
    if (error.status === 409) { throw APIError.entityNotUpdated(); }
    throw APIError.unspecified();
    // throw handleDynamoDbError(err, 'DYNAMODB_FAILURE');
  }
};

/**
 * Deletes existing Outlet
 * @param {*} param - email
 */
const deleteItem = async ({ createdBy }) => {
  try {
    const params = { TableName, Key: { entityHashKey: outletEntityHashKey, entitySortKey: outletEntitySortKey(createdBy) } };
    await dynamodbService.deleteItem(params);
  } catch (error) {
    console.error(error);
    throw APIError.userNotFound();
  }
};

module.exports = {
  create, read, update, delete: deleteItem
};
