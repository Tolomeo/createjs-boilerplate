const development = require("./.webpack/webpack.development");
const production = require("./.webpack/webpack.production");

const environment = {
  development,
  production,
};

module.exports = function webpackConfig(env) {
  const config = environment[env.mode];

  if (!config) {
    throw new Error(`No environment found matching the "${env.mode}" mode`);
  }

  return config;
};
