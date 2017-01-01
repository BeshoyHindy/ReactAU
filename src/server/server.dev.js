//import 'babel-polyfill'
import path from 'path';
import express from 'express';
import compression from 'compression';
import webpack from 'webpack';
import open from 'open';


import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack/webpack.config.dev';

import requestHandler from './requestHandler';

const app = new express();

let port = process.env.PORT || 3000;

global.__CLIENT__ = false; // eslint-disable-line
process.env.BROWSER = false;

let compiler = webpack(config);

//app.use(compression());
app.use(devMiddleware(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
}));
app.use(hotMiddleware(compiler));
delete process.env.BROWSER;

const oneDay = 86400000;
app.use( express.static(path.resolve(__dirname, '../../dist/public'), { maxAge: oneDay * 7 }));

// React application rendering
app.use(requestHandler);


app.listen(port, function(err) {
	if (err) {
		console.log(err);
	} else {
		//open(`http://localhost:${port}`);
	}
});



