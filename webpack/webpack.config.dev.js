let webpack = require('webpack');
let path  = require( 'path');
let ExtractTextPlugin  = require( 'extract-text-webpack-plugin');
//import HtmlWebpackPlugin from 'html-webpack-plugin';
let autoprefixer  = require( 'autoprefixer');
let HappyPack  = require( 'happypack');
/*
let info = autoprefixer().info();
console.log(info);
*/

import { development } from '../.config/configuration';


const dev_server = development.webpack.development_server;
const port = dev_server.port || 3002;
const host = dev_server.host || 'localhost';


let projectRoot = process.cwd();
let assetsPath = path.join(projectRoot,   "public", "build");
let publicPath = `http://${host}:${port}/build`;
let distPath = projectRoot;

let config = {
	cache: false,
	devtool: 'inline-eval-cheap-source-map',
	context: process.cwd(),
	entry: [
		'webpack-hot-middleware/client?reload=true',
		path.resolve(projectRoot, './src/client/index.js')
	],
	target: 'web',
	output: {
		path: assetsPath, // Note: Physical files are only output by the production build task `npm run build`.
		publicPath: publicPath,
		filename: 'bundle.js',
		chunkFilename: '[name]-[chunkhash].js',
        library: "[name]_[hash]"
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
			'process.env.BROWSER': true,
			__CLIENT__: true,
			__SERVER__: false,
			__DEVELOPMENT__: true,
			__DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
		}),
		//HtmlWebpackPluginConfig,
		new webpack.HotModuleReplacementPlugin(),
		new webpack.IgnorePlugin(/webpack-stats\.json$/),
		// new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin({
			filename: 'css/main.css',
			disable: false,
			allChunks: true
		}),
        new webpack.DllReferencePlugin({
            context: path.join(projectRoot, "src" , "client"),
            manifest: require("../dll/vendor-manifest.json")
        }),
	],
	module: {
		rules: [
			{
				test: /(\.jsx)|(\.js)$/i,
				exclude: /node_modules/,
				loader: 'babel-loader',
				include: [
                    path.join(projectRoot, "src" , "client"),
					path.join(projectRoot, "src" , "shared")
                ],
				options: {
					cacheDirectory: true,
					presets: ["react-hmre"]
				},
			},
			{
				test: /(\.sass|\.scss)$/,
				loader:
					ExtractTextPlugin.extract({
						fallbackLoader: "style-loader",
						loader: [
							{ loader: 'raw-loader'},
							{ loader: 'resolve-url-loader' },
							{ loader: 'sass-loader', query: {
									sourceMap: true,
									includePaths: [
										path.resolve(projectRoot, './node_modules/bootstrap-sass/assets/stylesheets/') ,
										path.resolve(projectRoot, './src/shared/sass/')
									]
								}
							}
						],
					})
			},
			{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: "url-loader?limit=10000&mimetype=application/font-woff&name=./fonts/[name].[ext]" },
			{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: "file-loader?name=./fonts/[name].[ext]" },
			{
				test: /\.gif$/i,
				loader: 'url-loader',
				include: [
					path.join(projectRoot, "src" , "shared", "img")
				],
				options: {
					name: '[path]/[name].[ext]',
					context: path.resolve(projectRoot, './src/shared'),
					limit:10000,
					mimetype:'image/gif'
				}
			},
			{
				test: /\.jpg$/i,
				loader: 'url-loader',
				include: [
					path.join(projectRoot, "src" , "shared", "img")
				],
				options: {
					name: '[path]/[name].[ext]',
					context: path.resolve(projectRoot, './src/shared'),
					limit:10000,
					mimetype:'image/jpg'
				}
			},
			{
				test: /\.png$/i,
				loader: 'url-loader',
				include: [
					path.join(projectRoot, "src" , "shared", "img")
				],
				options: {
					name: '[path]/[name].[ext]',
					context: path.resolve(projectRoot, './src/shared'),
					limit:10000,
					mimetype:'image/png'
				}
			},
			{
				test: /\.svg$/i,
				loader: 'url-loader',
				include: [
					path.join(projectRoot, "src" , "shared")
				],
				options: {
					name: 'fonts/[name].[ext]',
					context: path.resolve(projectRoot, './src/shared/fonts'),
					limit:26000,
					mimetype:'image/svg+xml'
				}
			},
		]
	},
    resolveLoader: {
		modules: [
			path.resolve(projectRoot, "./src/shared"),
			"node_modules"
		],
    },
    resolve: {
		modules: [
			path.resolve(projectRoot, "./src/shared"),
			"node_modules"
		],
        unsafeCache : true,
		// alias: {
        //     "bootstrap-sass": "node_modules/bootstrap-sass/assets/stylesheets/bootstrap",
		// 	"bootstrap-sass-font": "bootstrap-sass/assets/fonts/bootstrap/"
        // }
    },
	profile: true,
	stats: {
		hash: true,
		version: true,
		timings: true,
		assets: true,
		chunks: true,
		modules: true,
		reasons: true,
		children: true,
		source: false,
		errors: true,
		errorDetails: true,
		warnings: true,
		publicPath: true
	},
};


module.exports = config;
