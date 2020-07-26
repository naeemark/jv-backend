/**
 * Outlet Model
 */
const dynamoose = require('dynamoose');
const { dynamoTableName } = require('@config/vars');
const { dbConstants: { outletEntityHashKey } } = require('@utils/constants');

const { Schema } = dynamoose;

const EntitySchema = new Schema({
  entityHashKey: { type: String, hashKey: true, default: outletEntityHashKey },
  entitySortKey: { type: String, rangeKey: true },
  createdBy: { type: String },
  email: { type: String },
  name: { type: String },
  mobile: { type: String },
  isActive: { type: Boolean, default: true },
  isEmailVerified: { type: Boolean, default: false },
  isMobileVerified: { type: Boolean, default: false }
}, {
  timestamps: true
});


module.exports = dynamoose.model(dynamoTableName, EntitySchema);
