/* eslint-disable */

const dotenv = require('dotenv');
const path = require('path');
const moduleAlias = require('module-alias');


// Check the env
const NODE_ENV = (process.env.NODE_ENV || 'development');

// Configure "dotenv"
const result2 = dotenv.config({
  path: path.join(__dirname, `./env/${NODE_ENV}.env`),
});
if (result2.error) {
  throw result2.error;
}

// Configure module-alias
if (NODE_ENV === 'production') {
  // For production, we need to resolve the dist/src directory since that's where the compiled files are
  const distSrcPath = path.resolve('./dist/src');
  console.log(`Configuring module-alias for production: @src -> ${distSrcPath}`);

  moduleAlias.addAlias('@src', distSrcPath);

  // Add aliases for the problematic paths in influx_setup.js
  moduleAlias.addAlias('./server/src/common/EnvVars', path.join(distSrcPath, 'common/EnvVars'));
}

