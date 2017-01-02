// require('babel-core/register')({
//   presets: ['es2015', 'react']
// });

var path = require('path');
var express = require('express');
var compression  = require( 'compression');
var webpack  = require( 'webpack');
var open  = require( 'open');

var requestHandler = require('./requestHandler');

var app = new express();

var port = process.env.PORT || 3000;

global.__CLIENT__ = false; // eslint-disable-line

app.use(compression());
delete process.env.BROWSER;

var oneDay = 86400000;
app.set('view engine', 'ejs');
app.use( express.static(path.join(__dirname, './public'), { maxAge: oneDay * 7 }));
app.use(requestHandler);

//console.log(path.join(__dirname, '../../dist/public'));
app.listen(port, function(err) {
	if (err) {
		console.log(err);
	} else {
		//open(`http://localhost:${port}`);
	}
});



