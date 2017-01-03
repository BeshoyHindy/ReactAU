/* eslint no-console: 0 */


import compression from 'compression';
import express from 'express';
import http from 'http';
import httpProxy from 'http-proxy';
import path from 'path';
import cookieParser from 'cookie-parser';

import requestHandler from './requestHandler';
import { web_server  } from '../../.config/configuration';


const port = web_server.http.port;
global.__CLIENT__ = false; // eslint-disable-line
delete process.env.BROWSER;

const app = express();

const oneDay = 86400000;
app.use(compression());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use( express.static(path.resolve(__dirname, './public'), { maxAge: oneDay * 7 }));

app.use(requestHandler);

//console.log(path.join(__dirname, '../../dist/public'));
app.listen(port, function(err) {
	if (err) {
		console.log(err);
	} else {
		console.info(`Server listening on port ${port}!`);
	}
});



