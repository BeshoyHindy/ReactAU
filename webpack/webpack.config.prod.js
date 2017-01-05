var webpack  = require('webpack');
var path  = require('path');
var ExtractTextPlugin  = require('extract-text-webpack-plugin');
// var HtmlWebpackPlugin  = require('html-webpack-plugin');
var autoprefixer  = require('autoprefixer');
var CleanWebpackPlugin = require('clean-webpack-plugin');


var projectRoot = process.cwd(); 
var assetsPath = path.join(projectRoot,   "public", "build");
var publicPath = "/build/";
var distPath = projectRoot;


var config = [
	{
		name: "browser",
		cache: false,
		context: process.cwd(),
		entry: {
			bundle: [
						path.resolve(projectRoot, './src/client/index.js'),
						require.resolve('./util/polyfills')
				],
			vendor: [
				'react',
				'react-dom',
				'react-router',
				'redux',
				'react-redux',
				'react-imageloader',
				'react-router-redux',
				'redux-thunk',
				'react-tabs-isomorphic',
				'react-slick',
				'axios'
			]
		},
		target: 'web',
		output: {
			path: assetsPath,
			publicPath: publicPath,
			filename: '[name].js',
			chunkFilename: '[name]-[id].js'
		},
		plugins: [
			new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify("production"),
				BROWSER: true
			},
			__CLIENT__: true,
			__SERVER__: false,
			__DEVELOPMENT__: false,
			__DEVTOOLS__: false
			}),
			new ExtractTextPlugin({
				filename: 'css/main.css',
				disable: false,
				allChunks: true
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					screw_ie8: true,
					warnings: false
				},
				output: {
					comments: false
				},
				sourceMap: false
			}),
			new webpack.optimize.CommonsChunkPlugin({
				name: ['bundle', 'vendor'],
				filename: '[name].js',
				minChunks: Infinity
			}),
			new webpack.LoaderOptionsPlugin({
				minimize: true,
				debug: false
			}),
			new webpack.optimize.AggressiveMergingPlugin(),
			new CleanWebpackPlugin([ 'public/build'], {
				root: projectRoot,
				verbose: true, 
				//exclude: ['shared.js']
			})
		],
		module: {
			rules: [
				{
					test: /(\.jsx)|(\.js)$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					include: [
						path.join(projectRoot, "src" , "shared"),
						path.join(projectRoot, "src" , "client") //important for performance!
					],
					options: {
						cacheDirectory: true,
						babelrc: false,
						presets: [["es2015", {"loose": true, "module": false}], "stage-0", "react"],
					},
				},
				{
					test: /(\.sass|\.scss)$/,
					loader:
						ExtractTextPlugin.extract({
							fallbackLoader: "style-loader",
							loader: [
								{ loader: 'css-loader'},
								{ loader: 'resolve-url-loader' },
								{ loader: 'sass-loader', query: {
										sourceMap: true,
										includePaths: [
	//									 	  path.resolve(projectRoot, './node_modules/bootstrap-sass/assets/stylesheets/') ,
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
		resolve: {
			modules: [
				path.resolve(projectRoot, "./src/shared"),
				"node_modules"
			],
			unsafeCache : false
		},
	},
	{
		// The configuration for the server-side rendering
		name: "server-side rendering",
		entry: "./src/server/server.prod.js",
		target: "node",
		context: process.cwd(),
		node: {
			__dirname: false,
			__filename: false,
			global: true
		},
		output: {
			path: distPath,
			filename: "server.generated.js",
			publicPath: publicPath,
			libraryTarget: "commonjs2"
		},
		plugins: [
			new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify("production"),
			'process.env.BROWSER': false,
			__CLIENT__: false,
			__SERVER__: true,
			__DEVELOPMENT__: false,
			__DEVTOOLS__: false
			}),
			//HtmlWebpackPluginConfig,
			// new webpack.DefinePlugin(GLOBALS),
		],
		externals: /^[a-z\-0-9]+$/,
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
						presets: [["es2015", {"module": false}], "stage-0", "react"],
						plugins: ['react-hot-loader/babel'],
					},
				},
			]
		},
	}
];


module.exports = config;
