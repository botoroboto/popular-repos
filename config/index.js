/* istanbul ignore file */
// TODO - Could search for all files within the "config" folder (so it's easier to add scopes)
const defaultConfig = require('./default');

const test = require('./test');
const development = require('./development');
const production = require('./production');

const { NODE_ENV } = process.env || 'development';

const getEnvConfig = () => {
  const envConfig = {
    development,
    production,
    test,
  };
  return envConfig[NODE_ENV] || {};
};

module.exports = {
  ...defaultConfig,
  ...getEnvConfig(),
};
