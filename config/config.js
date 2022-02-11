const APPROOT = require('app-root-path');
const os = require('os');
const logger = require(`${APPROOT}/util/logger`)(module);

const configFile = require(`${APPROOT}/config/config.json`);
const configMode = configFile.run_mode;
const config = configFile[configMode];

logger.info('########################## CHECK CONFIG MODE ##########################');
logger.info(`# Service PORT ::: ${config.API_SERVICE_PORT}`);
logger.info(`# LOG_MODE ::: ${config.LOG_MODE}`);
logger.info('#######################################################################');

module.exports = config;
