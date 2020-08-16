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


const updateItem = async (updateParams) => {
  try {
    const { TableName, Key, Item } = updateParams;
    let updateExpression = 'set';
    const ExpressionAttributeNames = {};
    const ExpressionAttributeValues = {};
    Object.keys(Item).forEach((key) => {
      updateExpression += ` #${key} = :${key} ,`;
      ExpressionAttributeNames[`#${key}`] = key;
      ExpressionAttributeValues[`:${key}`] = Item[key];
    });
    updateExpression = updateExpression.slice(0, -1);
    const params = {
      TableName,
      Key,
      UpdateExpression: updateExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues
    };

    await dynamoDbClient.update(params).promise();
  } catch (error) {
    console.error(error);
    throw APIError.entityNotUpdated();
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
  createItem, readItem, updateItem, deleteItem, queryItem
};
