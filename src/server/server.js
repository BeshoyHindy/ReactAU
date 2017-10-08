/* eslint no-console: 0 */
"use strict";
import compression from 'compression';
import express from 'express';
import http from 'http';
import https from 'https';
import httpProxy from 'http-proxy';
import path from 'path';
import cookieParser from 'cookie-parser';
import request from 'request';
import cors from 'cors';
import helmet from 'helmet';
import xssFilters from 'xss-filters';
import {CronJob} from "cron";
import fs from 'fs';

import requestHandler from './requestHandler';
import { api_server, web_server, webpack_dev_server  } from '../../.config/configuration';

const port = web_server.http.port;
const host = web_server.http.host;
const devPort = webpack_dev_server.http.port ;
const devHost = webpack_dev_server.http.host ;


let publicPath = path.resolve( process.cwd(), "./public");
let viewPath = path.resolve(process.cwd(), "./src/server/views");

const ga_host = "www.google-analytics.com";
const ga_path = "/analytics.js";
const ga_local = "./public/local-ga.js";

function updateGA() {
	console.log("updateGA.......")
    let req = https.request({
        host: ga_host,
		family: 4,
		port: 443,		
        path: ga_path,
		method: 'GET',
		headers: {
			accept: '*/*'
		}
    }, function(response) {
        // Continuously update stream with data
        let body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
			fs.writeFile(ga_local, body, 'utf8', function(err){
				if (err) {
					// throw err;	
					console.log('updateGA fail', err);
				} 
				else{
					console.log('updateGA success');
				}
			});
        });
    });

	req.end();

	req.on('error', function(e) {
		console.log('updateGA fail', e);
	});
}
// Run this cron job every Sunday (0) at 7:00:00 AM
let job = new CronJob(	{
		cronTime: "00 00 7 * * 0",
		onTick: updateGA,
		start: true,
		runOnInit: true
	}
  );

job.start();
// updateGA();

global.__CLIENT__ = false; // eslint-disable-line
delete process.env.BROWSER;

const app = express();
app.disable('view cache');
const oneDay = 86400000;
if (process.env.NODE_ENV === 'production') {
	app.use(helmet());
	// app.use(helmet.noCache());   
	app.use(helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ["'none'"],
			//google custom search need 'unsafe-eval'....
			scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://www.google-analytics.com/", "http://cse.google.com/", "https://cse.google.com/", "https://connect.facebook.net/"
													, "https://apis.google.com/", "https://cdn.jsdelivr.net/", "https://ajax.googleapis.com/", "https://www.google.com"
													, "https://cdn.polyfill.io/", api_server.http.host	],
			// scriptSrc: ["'self'", "'unsafe-inline'", "https://www.google-analytics.com/", "http://cse.google.com/", "https://cse.google.com/", "https://connect.facebook.net/"
			// 										, "https://apis.google.com/", "https://cdn.jsdelivr.net/", "https://ajax.googleapis.com/", "https://www.google.com", api_server.http.host	],
			styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://www.google.com", "https://cse.google.com/", api_server.http.host],
			imgSrc: ["'self'", "data:", "https://www.google-analytics.com/", "https://www.facebook.com/", "https://staticxx.facebook.com/", 
										"https://www.google.com", "https://www.googleapis.com/", "https://clients1.google.com", api_server.http.host],
			fontSrc: ["'self'", "https://fonts.gstatic.com", "data:", api_server.http.host,],
			frameSrc: ["'self'", api_server.http.host, "https://accounts.google.com/","https://staticxx.facebook.com/", "https://maps.google.com/", "https://www.google.com/"],
			connectSrc: ["'self'", api_server.http.host],
			reportUri: "/cspviolation"
		},
	}));
	app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));
}

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


if (process.env.NODE_ENV === 'development') {
	const devProxy = httpProxy.createProxyServer({});
	app.get('/build/img/*', function (request, response) {
		return devProxy.web(request, response, {
			target: `${devHost}:${devPort}`
		});
	});
	console.log(`Webpack Dev Server Proxy: ${devHost}:${devPort}...`);
}

app.use(requestHandler);

//console.log(path.join(__dirname, '../../dist/public'));
app.listen(port, function(err) {
	if (err) {
		console.log(err);
	} else {
		console.info(`Server listening on port ${port}!`);
	}
});


