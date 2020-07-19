const dynamoose = require("dynamoose");
const Schema = dynamoose.Schema;

const UserSchema = new Schema({
  entityHashKey: { type: String, hashKey: true, default: '#JV-USER#' },
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

// Exports
module.exports = User = dynamoose.model("jv-users", UserSchema);
