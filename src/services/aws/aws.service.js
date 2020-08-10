/**
 * Aws Service
 *
 */
const AWS = require('aws-sdk');

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports = { AWS, dynamoDbClient };
