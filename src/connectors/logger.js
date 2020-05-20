const winston = require('winston');
const {
  LOG_LEVEL,
  SPLUNK_URL,
  SPLUNK_TOKEN,
  SPLUNK_SOURCE,
  SPLUNK_SOURCETYPE,
  SPLUNK_INDEX
} = require('../config');

const level = LOG_LEVEL || 'info';
const logger = winston.createLogger({
  level
});

// Activate Splunk logging if Splunk's env variables are set
if (SPLUNK_URL) {
  const SplunkStreamEvent = require('winston-splunk-httplogger'); // eslint-disable-line global-require

  const splunkSettings = {
    url: SPLUNK_URL || 'localhost',
    token: SPLUNK_TOKEN,
    source: SPLUNK_SOURCE || '/var/log/GHOIdShim.log',
    sourcetype: SPLUNK_SOURCETYPE || 'github-cognito-openid-wrapper',
    index: SPLUNK_INDEX || 'main',
    maxBatchCount: 1
  };

  logger.add(
    new SplunkStreamEvent({
      splunk: splunkSettings,
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.timestamp()
      )
    })
  );
} else {
  // STDOUT logging for dev/regular servers
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.colorize({ all: true }),
        winston.format.simple()
      )
    })
  );
}

module.exports = logger;
