//import 'babel-polyfill'
import path from 'path';
import express from 'express';
import compression from 'compression';
import webpack from 'webpack';
import open from 'open';
import cookieParser from 'cookie-parser';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack/webpack.config.dev';
import { api_server, web_server, development } from '../../.config/configuration';

import requestHandler from './requestHandler';


const port = web_server.http.port || 3000;
const host = web_server.http.host || 'localhost';
const dev_server = development.webpack.development_server;


const app = express();


global.__CLIENT__ = false; // eslint-disable-line
process.env.BROWSER = false;
delete process.env.BROWSER;


const serverOptions = {
  contentBase: `http://${host}:${port}/`,
  // quiet: true,
  // noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
};

let compiler = webpack(config);

//app.use(compression());
console.log(serverOptions);
app.use(devMiddleware(compiler, serverOptions));
app.use(hotMiddleware(compiler));


const oneDay = 86400000;
app.use(compression());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use( express.static(path.resolve(__dirname, '../../public'), { maxAge: oneDay * 7 }));
app.use(requestHandler);

app.listen(port, function(err) {
	if (err) {
		console.log(err);
	} else {
		console.info(`Server listening on port ${port}!`);
	}
});





