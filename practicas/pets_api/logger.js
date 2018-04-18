
const bunyan = require('bunyan');
const logger = bunyan.createLogger({
    name: 'API',                     // Required
    level: 'debug',      // Optional, see "Levels" section
    src: true
});

module.exports = logger;