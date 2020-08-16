/**
 * Dynamodb Service
 *
 */


const { APIError } = require('@utils/APIError');
const { dynamoDbClient } = require('@services/aws');


const createItem = async (requestParams) => {
  const { TableName, Item } = requestParams;
  try {
    await dynamoDbClient.put({
      TableName,
      Item,
      ConditionExpression: 'attribute_not_exists(entityHashKey) AND attribute_not_exists(entitySortKey)'
    }).promise();
    return Item;
  } catch (error) {
    console.error(error.code);
    throw APIError.entityAlreadyExists();
  }
};

const readItem = async (requestParams) => {
  try {
    const data = await dynamoDbClient.get(requestParams).promise();
    return data.Item;
  } catch (error) {
    console.error(error);
    throw APIError.resourceNotFound();
  }
};

const deleteItem = async (requestParams) => {
  try {
    await dynamoDbClient.delete(requestParams).promise();
  } catch (error) {
    console.error(error);
    throw APIError.resourceNotFound();
  }
};

const queryItem = async (requestParams) => {
  try {
    const data = await dynamoDbClient.query(requestParams).promise();
    return data;
  } catch (error) {
    console.error(error);
    throw APIError.unauthorized();
  }
};


module.exports = {
  createItem, readItem, deleteItem, queryItem
};
