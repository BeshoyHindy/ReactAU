// set up the `require`-hook
require('babel-register');

// load your actual app, which will
// now be transpiled by babel
require('./server.dev');
