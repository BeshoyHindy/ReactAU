let webpack = require('webpack');
let path  = require( 'path');
let ExtractTextPlugin  = require( 'extract-text-webpack-plugin');

//http://stackoverflow.com/questions/36854862/redux-hot-reload-warning-on-changes
const webpack_dev_server = require('../.config/configuration').webpack_dev_server;

const port = webpack_dev_server.http.port;
const host = webpack_dev_server.http.host;


let projectRoot = process.cwd();
let assetsPath = path.join(projectRoot,   "public", "build");
let publicPath = `${host}:${port}/build/`;
let distPath = projectRoot;

let config = 
{
	// The configuration for the server-side rendering
	name: "server-side rendering",
	entry: "./src/server/server.js",
	target: "node",
	context: process.cwd(),
	node: {
		__dirname: false,
		__filename: false,
		global: true
	},
	output: {
		path: distPath,
		filename: "server.generate.dev.js",
		publicPath: publicPath,
		libraryTarget: "commonjs2",
	},
	plugins: [
		new webpack.DefinePlugin({
		'process.env.BROWSER': false,
		__CLIENT__: false,
		__SERVER__: true,
		__DEVELOPMENT__: true,
		__DEVTOOLS__: true
		}),
	],
	module: {
		rules: [
			{
				test: /(\.jsx)|(\.js)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				include: [
					path.join(projectRoot, "src" ) //important for performance!
				],
				options: {
					cacheDirectory: true,
					babelrc: false,
					presets: [['es2015', {modules: false, loose: true}], "react"],
					plugins: [
						"syntax-dynamic-import",
						"transform-object-rest-spread",
						"transform-class-properties",
					],  				

				},
			},
		]
	},
}



module.exports = config;
