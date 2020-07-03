/*!
 * npm Entry File
 * (c) 2020 Joshua Adams
 */

/**
 * index.js is the default 'entry file' for npm.
 * This means that any require('package name') or import 'package name'
 * statements will refer to this file.
 */
const pkg = require('./package.json');
// export a file with the same name as the package by default
module.exports = require(`./src/js/${pkg.name}.js`);