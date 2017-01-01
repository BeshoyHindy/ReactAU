import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';

var projectRoot = process.cwd(); 
var assetsPath = path.join(projectRoot,  "dist", "public");
var publicPath = "/";
var distPath = path.join(projectRoot,  "dist");



export default [
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
				'react-tabs',
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
				name: ['main', 'vendor'],
				filename: '[name].js',
				minChunks: Infinity
			}),
			new webpack.LoaderOptionsPlugin({
				minimize: true,
				debug: false
			}),
			new webpack.optimize.AggressiveMergingPlugin()
		],
		module: {
			rules: [
				{
					test: /(\.jsx)|(\.js)$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					include: [
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
											path.resolve(projectRoot, './src/client/sass/')
										]
									}
								}
							],
							publicPath: '../'
						})
				},
				{
					test: /\.(ttf|otf|eot|svg|woff(2)?)(\?\S*)?$/i,
					loader: 'file-loader',
					options: {
						name: 'fonts/[name].[ext]',
						context: path.resolve(projectRoot, './src/client/fonts')
					}
				},
				{
					test: /\.(jpe?g|png|gif|svg|ico)$/i,
					include: [
						path.resolve(projectRoot, './src/client/img')
					],				
					loader: 'file-loader',
					query: {
						name: '[path][name].[ext]',
						context: path.resolve(projectRoot, './src/client')
					}
				},
				{
					test: /\.json$/i,
					loader: 'file-loader',
					include: [
						path.resolve(projectRoot, './src/client/json')
					],
					query: {
						name: '[path][name].[ext]',
						context: path.resolve(projectRoot, './src/client')
					}
				},
				{
					test: /\.(pdf)$/i,
					loader: 'file-loader',
					include: [
						path.resolve(projectRoot, './src/client/json/docs')
					],
					query: {
						name: 'docs/[name].[ext]',
						context: path.resolve(projectRoot, './src/client/json/docs')
					}
				}
			]
		},
		resolve: {
			modules: [
				path.resolve(projectRoot, "./src/client"),
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
