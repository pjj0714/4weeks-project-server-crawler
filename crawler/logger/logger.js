const log4js = require('log4js');
const config = require('../config/config.json');
log4js.configure(config.log);

module.exports = log => {
  return log4js.getLogger(log);
};
