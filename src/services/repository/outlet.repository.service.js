/**
 * Outlet Repository
 *
 */

const { APIError } = require('@utils/APIError');
const { dbConstants: { outletEntityHashKey, outletEntitySortKey } } = require('@utils/constants');
const dynamodbService = require('@services/dynamodb');
const { dynamoTableName: TableName } = require('@config/vars');


const create = async (Item) => {
  try {
    const { createdBy } = Item;
    Item.entityHashKey = outletEntityHashKey;
    Item.entitySortKey = outletEntitySortKey(createdBy);
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

const update = async (Item) => {
  console.log(Item);
  return { updatedStub: true };
};

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
