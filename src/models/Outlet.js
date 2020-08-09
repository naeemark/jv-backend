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
  name: { type: String },
  mobile: { type: String },
  email: { type: String },
  url: { type: String },
  seatCapacity: { type: Number },
  cnic: { type: String },
  createdBy: { type: String },
  isActive: { type: Boolean, default: true },
  isEmailVerified: { type: Boolean, default: false },
  isMobileVerified: { type: Boolean, default: false },
  timeTable: { type: Array, schema: [{ type: Object, schema: { day: String, start: String, end: String } }] }
}, {
  timestamps: true
});


module.exports = dynamoose.model(dynamoTableName, EntitySchema);
