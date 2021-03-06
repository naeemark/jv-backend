/**
 * User Model
 */
const dynamoose = require('dynamoose');
const { dynamoTableName } = require('@config/vars');
const { dbConstants: { userEntityHashKey } } = require('@utils/constants');

const { Schema } = dynamoose;

const EntitySchema = new Schema({
  entityHashKey: { type: String, hashKey: true, default: userEntityHashKey },
  entitySortKey: { type: String, rangeKey: true },
  email: { type: String },
  password: { type: String },
  name: { type: String },
  mobile: { type: String },
  userType: { type: String },
  isActive: { type: Boolean, default: true },
  isEmailVerified: { type: Boolean, default: false },
  isMobileVerified: { type: Boolean, default: false }
}, {
  timestamps: true
});


module.exports = dynamoose.model(dynamoTableName, EntitySchema);
