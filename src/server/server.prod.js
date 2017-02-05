/* eslint no-console: 0 */


import compression from 'compression';
import express from 'express';
import http from 'http';
import httpProxy from 'http-proxy';
import path from 'path';
import cookieParser from 'cookie-parser';
import request from 'request';
import cors from 'cors';

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
app.use(cors());

//development hot reload
if (process.env.NODE_ENV === "development"){
	console.log(`proxy from development dev server http://${dev_server.host}:${dev_server.port}.....`);
	let devServerProxy = httpProxy.createProxyServer();
	app.use('/build', (req, res) => {
		devServerProxy.web(req, res, { target: `http://${dev_server.host}:${dev_server.port}/build` });
	});
}

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


//console.log(path.join(__dirname, '../../dist/public'));
app.listen(port, function(err) {
	if (err) {
		console.log(err);
	} else {
		console.info(`Server listening on port ${port}!`);
	}
});



