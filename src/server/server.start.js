// set up the `require`-hook
require('babel-register');

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}
require('es6-promise').polyfill();
Object.assign = require('object-assign');


// load your actual app, which will
// now be transpiled by babel
require('./server.js');
