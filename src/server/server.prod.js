/* eslint no-console: 0 */


import compression from 'compression';
import express from 'express';
import http from 'http';
import httpProxy from 'http-proxy';
import path from 'path';
import cookieParser from 'cookie-parser';
import request from 'request';

import requestHandler from './requestHandler';
import { api_server, web_server ,development } from '../../.config/configuration';

const port = web_server.http.port || 3000;
const host = web_server.http.host || 'localhost';
const dev_server = development.webpack.development_server;
global.__CLIENT__ = false; // eslint-disable-line
delete process.env.BROWSER;

const app = express();

let publicPath = path.resolve( process.cwd(), "./public");
let viewPath = path.resolve(process.cwd(), "./src/server/views");
const oneDay = 86400000;
app.use(compression());
app.use(cookieParser());
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');


//development hot reload
if (process.env.NODE_ENV === "development"){
	console.log(`proxy from development dev server http://${dev_server.host}:${dev_server.port}.....`);
	let devServerProxy = httpProxy.createProxyServer();
	app.use('/build', (req, res) => {
		devServerProxy.web(req, res, { target: `http://${dev_server.host}:${dev_server.port}/build` });
	});
}

console.log(`api server proxy http://${api_server.http.host}:${api_server.http.port}/`);
let apiServerProxy = httpProxy.createProxyServer();
app.use('/api', (req, res) => {
	apiServerProxy.web(req, res, { target: `${api_server.http.host}:${api_server.http.port}` });
});


app.set('views', viewPath);
app.use( express.static(publicPath, { maxAge: oneDay * 7 }));
app.use(requestHandler);


//console.log(path.join(__dirname, '../../dist/public'));
app.listen(port, function(err) {
	if (err) {
		console.log(err);
	} else {
		console.info(`Server listening on port ${port}!`);
	}
});



