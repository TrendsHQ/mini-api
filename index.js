/* eslint-disable semi */
const pkg = require('./build');

module.exports = pkg.default;
delete pkg.default;
Object.assign(module.exports, pkg);
