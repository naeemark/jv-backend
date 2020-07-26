/**
 * Constants Utility
 *
 */
const dbConstants = {
  userEntityHashKey: '#JV-USER#',
  userEntitySortKey: email => `#USR#${email}#`,
  outletEntityHashKey: '#JV-OUTLET#',
  outletEntitySortKey: email => `#OUTLET#USR#${email}#`
};


module.exports = { dbConstants };
