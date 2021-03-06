module.exports = {
  REGION: process.env.AWS_REGION,
  COGNITO_REDIRECT_URI: process.env.COGNITO_REDIRECT_URI,
  DYNAMODB_STATE_TABLE: process.env.DYNAMODB_STATE_TABLE,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_API_URL: process.env.GITHUB_API_URL,
  GITHUB_LOGIN_URL: process.env.GITHUB_LOGIN_URL,
  LOG_LEVEL: process.env.LOG_LEVEL,
  PORT: parseInt(process.env.PORT, 10) || undefined,

  // Splunk logging variables
  SPLUNK_URL: process.env.SPLUNK_URL,
  SPLUNK_TOKEN: process.env.SPLUNK_TOKEN,
  SPLUNK_SOURCE: process.env.SPLUNK_SOURCE,
  SPLUNK_SOURCETYPE: process.env.SPLUNK_SOURCETYPE,
  SPLUNK_INDEX: process.env.SPLUNK_INDEX
};
