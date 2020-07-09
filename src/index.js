require('module-alias/register');
const async = require('async');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const app = require('@config/app');
const startupBoot = require('./boot');
const { logger } = require('./utils/logger');

const startupTasks = [];
startupBoot.forEach((boot) => {
  startupTasks.push(async.apply(boot, app));
});

/* istanbul ignore next */
async.waterfall(startupTasks, (err) => {
  if (err) {
    logger.error('Unable to start server - please restart the service', err);
    process.exit(1);
  }
});

/**
* Exports express
* @public
*/
module.exports = app;