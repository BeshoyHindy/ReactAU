import path from 'path';
import express from 'express';
import webpack from 'webpack';
import open from 'open';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack/webpack.config.dev.client';
import {  api_server,  web_server, webpack_dev_server } from '../../.config/configuration';


import http from 'http';
import httpProxy from 'http-proxy';
import request from 'request';


const port = webpack_dev_server.http.port ;
const host = webpack_dev_server.http.host ;
const app = express();

const serverOptions = {
  // quiet: true,
  // noInfo: true,
	hot         : true, // adds the HotModuleReplacementPlugin and switch the server to hot mode. Note: make sure you don’t add HotModuleReplacementPlugin twice
	inline      : true, // also adds the webpack/hot/dev-server entry
	publicPath: config.output.publicPath,
	headers: { 'Access-Control-Allow-Origin': '*' },
	progress: true,
	profile: true,
	stats: {
		hash: true,
		version: true,
		timings: true,
		assets: false,
		chunks: false,
		modules: true,
		reasons: false,
		children: false,
		source: false,
		errors: true,
		errorDetails: true,
		warnings: true,
		publicPath: true,
		colors: true,
		// maxModules: Infinity, //to verify what module waste the most time
		exclude: undefined
	},
};

let compiler = webpack(config);

//console.log(serverOptions);
app.use(devMiddleware(compiler, serverOptions));
app.use(hotMiddleware(compiler));


app.listen(port, function(err) {
	if (err) {
		console.log(err);
	} else {
		console.info(`Webpack Dev Server listening on port ${port}!`);
	}
});




