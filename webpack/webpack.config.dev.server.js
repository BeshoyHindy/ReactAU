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
		pathinfo: true
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
						"dynamic-import-webpack",
						"transform-object-rest-spread",
						"transform-class-properties",
						// "transform-es2015-arrow-functions",
						// "transform-es2015-block-scoped-functions",
						// "transform-es2015-block-scoping",
						// ["transform-es2015-classes", {
						// 	"loose": true
						// }],
						// ["transform-es2015-computed-properties", {
						// 	"loose": true
						// }],
						// "transform-es2015-destructuring",
						// "transform-es2015-duplicate-keys",
						// ["transform-es2015-for-of", {
						// 	"loose": true
						// }],
						// "transform-es2015-function-name",
						// "transform-es2015-object-super",
						// "transform-es2015-parameters",
						// "transform-es2015-shorthand-properties",
						// ["transform-es2015-spread", {
						// 	"loose": true
						// }],
						// "transform-es2015-sticky-regex",
						// ["transform-es2015-template-literals", {
						// 	"loose": true
						// }]
					],  				

				},
			},
		]
	},
}



module.exports = config;
