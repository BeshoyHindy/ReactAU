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
import {  web_server, development } from '../../.config/configuration';

import requestHandler from './requestHandler';


const port = web_server.http.port || 3000;
const host = web_server.http.host || 'localhost';
const dev_server = development.webpack.development_server;


const app = express();


global.__CLIENT__ = false; // eslint-disable-line
process.env.BROWSER = false;
delete process.env.BROWSER;


const serverOptions = {
  // quiet: true,
  // noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  headers: {
              'Access-Control-Allow-Origin': '*' , 
              'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
              'Access-Control-Allow-Headers': 'X-Requested-With,content-typeE',
              'Access-Control-Allow-Credentials': true
          },
  stats: { colors: true },
};

let compiler = webpack(config);

//console.log(serverOptions);
app.use(devMiddleware(compiler, serverOptions));
app.use(hotMiddleware(compiler));

app.listen(dev_server.port, function(err) {
	if (err) {
		console.log(err);
	} else {
		console.info(`Server listening on port ${dev_server.port}!`);
	}
});





