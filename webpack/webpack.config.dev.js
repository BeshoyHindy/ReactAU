var webpack = require('webpack');
var path  = require( 'path');
var ExtractTextPlugin  = require( 'extract-text-webpack-plugin');
//import HtmlWebpackPlugin from 'html-webpack-plugin';
var autoprefixer  = require( 'autoprefixer');
var HappyPack  = require( 'happypack');
/*
var info = autoprefixer().info();
console.log(info);
*/

import { development } from '../.config/configuration';


const dev_server = development.webpack.development_server;
const port = dev_server.port || 3002;
const host = dev_server.host || 'localhost';


var projectRoot = process.cwd();
var assetsPath = path.join(projectRoot,   "public", "build");
var publicPath = `http://${host}:${port}/build`;
var distPath = projectRoot;

var happyThreadPool = HappyPack.ThreadPool({ size: 5 });
// HappyPack.SERIALIZABLE_OPTIONS = HappyPack.SERIALIZABLE_OPTIONS.concat(['postcss-loader']);
console.log(assetsPath);
function createHappyPlugin(id, loaders) {
  return new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,

    // disable happy caching with HAPPY_CACHE=0
    cache: false,

    // make happy more verbose with HAPPY_VERBOSE=1
    verbose: true,
  });
}


var config = {
	cache: false,
	devtool: 'inline-eval-cheap-source-map',
	context: process.cwd(),
	entry: [
		`webpack-hot-middleware/client?path=http://${dev_server.host}:${port}/__webpack_hmr`,
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
		createHappyPlugin('jsHappy',
			[
				{
					path: 'babel-loader',
					query: {
						cacheDirectory: true,
						presets: [["es2015", {"loose": true, "module": false}], "stage-0", "react"],
						plugins: ['react-hot-loader/babel'],
					}
				}
			]
		),
		// createHappyPlugin('sassHappy',
		// 	[
		// 		{ path: 'raw-loader'/*, query: { sourceMap: true, importLoaders: 2, localIdentName: '[name]__[local]__[hash:base64:5]' }*/ },
		// 		{ path: 'resolve-url-loader' },
		// 		{ path: 'postcss-loader' },
		// 		{ path: 'sass-loader', query: {
		// 					sourceMap: true,
		// 					includePaths: [
		// 						path.resolve(projectRoot, './node_modules/bootstrap-sass/assets/stylesheets/') ,
		// 						path.resolve(projectRoot, './src/client/sass/')
		// 					]
		// 			}
		// 		}
		// 	]
		// )
	],
	module: {
		rules: [
			{
				test: /(\.jsx)|(\.js)$/i,
				exclude: /node_modules/,
				loader: 'happypack/loader?id=jsHappy',
				include: [
                    path.join(projectRoot, "src" , "client") //important for performance!
                ],
				// options: {
				// 	cacheDirectory: true,
				// 	babelrc: false,
				// 	presets: [["es2015", {"loose": true, "module": false}], "stage-0", "react"],
				// 	plugins: ['react-hot-loader/babel'],
				// },
			},
			// {
			// 	test: /(\.sass|\.scss)$/i,
			// 	loader:
			// 		ExtractTextPlugin.extract({
			// 			fallbackLoader: "style-loader",
			// 			loader: 'happypack/loader?id=sassHappy'
			// 		})
			// },
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
										path.resolve(projectRoot, './src/client/sass/')
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
					path.join(projectRoot, "src" , "client", "img")
				],
				options: {
					name: '[path]/[name].[ext]',
					context: path.resolve(projectRoot, './src/client'),
					limit:10000,
					mimetype:'image/gif'
				}
			},
			{
				test: /\.jpg$/i,
				loader: 'url-loader',
				include: [
					path.join(projectRoot, "src" , "client", "img")
				],
				options: {
					name: '[path]/[name].[ext]',
					context: path.resolve(projectRoot, './src/client'),
					limit:10000,
					mimetype:'image/jpg'
				}
			},
			{
				test: /\.png$/i,
				loader: 'url-loader',
				include: [
					path.join(projectRoot, "src" , "client", "img")
				],
				options: {
					name: '[path]/[name].[ext]',
					context: path.resolve(projectRoot, './src/client'),
					limit:10000,
					mimetype:'image/png'
				}
			},
			{
				test: /\.svg$/i,
				loader: 'url-loader',
				include: [
					path.join(projectRoot, "src" , "client")
				],
				options: {
					name: 'fonts/[name].[ext]',
					context: path.resolve(projectRoot, './src/client/fonts'),
					limit:26000,
					mimetype:'image/svg+xml'
				}
			},
		]
	},
    resolveLoader: {
		modules: [
		  path.resolve(projectRoot, "./src/client"),
		  "node_modules"
		],
    },
    resolve: {
		modules: [
			path.resolve(projectRoot, "./src/client"),
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
