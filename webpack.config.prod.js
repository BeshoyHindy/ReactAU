import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';


var assetsPath = path.join(__dirname,  "dist", "public");
var publicPath = "/";
var distPath = path.join(__dirname,  "dist");

// let HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
// 	title: 'High Digital CCTV',
// 	template: __dirname + '/src/index.html',
// 	filename: 'index.html',
// 	inject: 'body'
// });

// const GLOBALS = {
// 	'process.env.NODE_ENV': JSON.stringify('production')
// };


export default [
	{
		name: "browser",
		cache: true,
		context: process.cwd(),
		entry: path.resolve(__dirname, './src/client/index.js'),
		target: 'web',
		output: {
			path: assetsPath,
			publicPath: publicPath,
			filename: 'bundle.js',
			library: "[name]_[hash]"
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
			//HtmlWebpackPluginConfig,
			// new webpack.DefinePlugin(GLOBALS),
			new ExtractTextPlugin({
				filename: 'css/main.css',
				disable: false,
				allChunks: true
			}),
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.DllReferencePlugin({
				context: path.join(__dirname, "src" , "client"),
				manifest: require("./dll/vendor-manifest.json")
			}),
		],
		module: {
			rules: [
				{
					test: /(\.jsx)|(\.js)$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					include: [
						path.join(__dirname, "src" , "client") //important for performance!
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
	//									 	  path.resolve(__dirname, './node_modules/bootstrap-sass/assets/stylesheets/') ,
											path.resolve(__dirname, './src/client/sass/')
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
						context: path.resolve(__dirname, './src/client/fonts')
					}
				},
				{
					test: /\.(jpe?g|png|gif|svg|ico)$/i,
					include: [
						path.resolve(__dirname, './src/client/img')
					],
					loader: 'file-loader',
					query: {
						name: '[path][name].[ext]',
						context: path.resolve(__dirname, './src/client')
					}
				},
				{
					test: /\.json$/i,
					loader: 'file-loader',
					include: [
						path.resolve(__dirname, './src/client/json')
					],
					query: {
						name: '[path][name].[ext]',
						context: path.resolve(__dirname, './src/client')
					}
				},
				{
					test: /\.(pdf)$/i,
					loader: 'file-loader',
					include: [
						path.resolve(__dirname, './src/client/json/docs')
					],
					query: {
						name: 'docs/[name].[ext]',
						context: path.resolve(__dirname, './src/client/json/docs')
					}
				}
			]
		},
		resolve: {
			modules: [
			path.resolve(__dirname, "./src/client"),
			"node_modules"
			],
			unsafeCache : true
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
						path.join(__dirname, "src" ) //important for performance!
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
	}
];
