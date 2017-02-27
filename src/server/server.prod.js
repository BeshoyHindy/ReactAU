/* eslint no-console: 0 */

import compression from 'compression';
import express from 'express';
import http from 'http';
import httpProxy from 'http-proxy';
import path from 'path';
import cookieParser from 'cookie-parser';
import request from 'request';
import cors from 'cors';
import helmet from 'helmet';
import xssFilters from 'xss-filters';

import requestHandler from './requestHandler';
import { api_server, web_server ,development } from '../../.config/configuration';

const port = web_server.http.port || 3000;
const host = web_server.http.host || 'localhost';

global.__CLIENT__ = false; // eslint-disable-line
delete process.env.BROWSER;

const app = express();

let publicPath = path.resolve( process.cwd(), "./public");
let viewPath = path.resolve(process.cwd(), "./src/server/views");
const oneDay = 86400000;
app.use(helmet());
app.use(helmet.noCache());
app.use(helmet.contentSecurityPolicy({
	directives: {
		defaultSrc: ["'none'"],
		scriptSrc: ["'self'", "'unsafe-inline'", "https://www.google-analytics.com/", "http://cse.google.com/", "https://cse.google.com/", "https://connect.facebook.net/"
												, "https://apis.google.com/", "https://cdn.jsdelivr.net/", "https://ajax.googleapis.com/", "https://www.google.com", api_server.http.host	],
		styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", api_server.http.host],
		imgSrc: ["'self'", "data:", "https://www.google-analytics.com/", "https://www.facebook.com/", "https://staticxx.facebook.com/", api_server.http.host],
		fontSrc: ["'self'", "https://fonts.gstatic.com", "data:", api_server.http.host,],
		frameSrc: ["'self'", api_server.http.host, "https://accounts.google.com/","https://staticxx.facebook.com/"],
		connectSrc: ["'self'", api_server.http.host],
		reportUri: "/cspviolation"
	},
}));
app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));
app.use(compression());
app.use(cookieParser());
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');


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


