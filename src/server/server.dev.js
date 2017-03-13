import path from 'path';
import express from 'express';
import compression from 'compression';
import webpack from 'webpack';
import open from 'open';
import cookieParser from 'cookie-parser';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack/webpack.config.dev.client';
import {  api_server,  web_server, development } from '../../.config/configuration';

import requestHandler from './requestHandler';


import http from 'http';
import httpProxy from 'http-proxy';
import request from 'request';


const port = web_server.http.port || 3000;
const host = web_server.http.host || 'localhost';



const app = express();

let publicPath = path.resolve( process.cwd(), "./public");
let viewPath = path.resolve(process.cwd(), "./src/server/views");
const oneDay = 86400000;
app.use(cookieParser());
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');


delete process.env.BROWSER;

const serverOptions = {
  // quiet: true,
  // noInfo: true,
	// hot: true,
	publicPath: config.output.publicPath,
	progress: true,
	stats: {
		hash: true,
		version: true,
		timings: true,
		assets: false,
		chunks: true,
		modules: true,
		reasons: false,
		children: false,
		source: false,
		errors: true,
		errorDetails: true,
		warnings: true,
		publicPath: true,
		colors: true
	},
};

let compiler = webpack(config);

//console.log(serverOptions);
app.use(devMiddleware(compiler, serverOptions));
app.use(hotMiddleware(compiler));




// use httpProxy will rejected by heroku, use manually instead
console.log(`redirect to api server:${api_server.http.host}:${api_server.http.port}/`);
app.use('/api', function(req, res, next) {
  let method, r;
  method = req.method.toLowerCase().replace(/delete/,"del");
  let path = req.url.replace(/^\/api\//,"");
  switch (method) {
    case "get":
    case "post":
    case "del":
    case "put":
      r = request[method]({
        uri: `${api_server.http.host}:${api_server.http.port}/${path}`,
        json: req.body
      });
      break;
    default:
      return res.send("invalid method");
  }
  return req.pipe(r).pipe(res);
});

app.set('views', viewPath);
app.use( express.static(publicPath, { maxAge: oneDay * 7 }));
app.use(requestHandler);



app.listen(port, function(err) {
	if (err) {
		console.log(err);
	} else {
		console.info(`Server listening on port ${port}!`);
	}
});




