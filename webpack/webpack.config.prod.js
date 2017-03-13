var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var webpack  = require('webpack');
var path  = require('path');
var ExtractTextPlugin  = require('extract-text-webpack-plugin');
// var HtmlWebpackPlugin  = require('html-webpack-plugin');
var autoprefixer  = require('autoprefixer');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const AssetsPlugin = require('assets-webpack-plugin');

var projectRoot = process.cwd(); 
var assetsPath = path.join(projectRoot,   "public", "build");
var publicPath = "/build/";
var distPath = projectRoot;

//https://github.com/webpack/webpack/issues/1081
var config = [
	{
		name: "browser",
		cache: false,
		context: process.cwd(),
		entry: {
			bundle: [
				path.resolve(projectRoot, './src/client/index.js'),
				require.resolve('./util/polyfills')
			]
		},
		target: 'web',
		output: {
			path: assetsPath,
			publicPath: publicPath,
			filename: '[name]-[chunkhash].js',
			chunkFilename: '[name]-[chunkhash].js'
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
			new webpack.LoaderOptionsPlugin({
				minimize: true,
				debug: false
			}),
			new webpack.optimize.AggressiveMergingPlugin(),
			new CleanWebpackPlugin([ 'public/build'], {
				root: projectRoot,
				verbose: true, 
			}),
			// new BundleAnalyzerPlugin({
			// 	analyzerMode: 'static'
			// }),

			new webpack.optimize.CommonsChunkPlugin({
				name: 'vendor',
				minChunks: ({ resource }) => /node_modules/.test(resource),
			}),
			// Generate a 'manifest' chunk to be inlined in the HTML template
			new webpack.optimize.CommonsChunkPlugin('manifest'),

			// Need this plugin for deterministic hashing
			// until this issue is resolved: https://github.com/webpack/webpack/issues/1315
			// for more info: https://webpack.js.org/how-to/cache/
			new WebpackMd5Hash(),	
			new AssetsPlugin({fullPath: false})	
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
						presets: ["react"],
						plugins: [
							"transform-object-rest-spread",
							"transform-class-properties",
							"transform-es2015-arrow-functions",
							"transform-es2015-block-scoped-functions",
							"transform-es2015-block-scoping",
							["transform-es2015-classes", {
								"loose": true
							}],
							["transform-es2015-computed-properties", {
								"loose": true
							}],
							"transform-es2015-destructuring",
							"transform-es2015-duplicate-keys",
							["transform-es2015-for-of", {
								"loose": true
							}],
							"transform-es2015-function-name",
							["transform-es2015-modules-commonjs", {
								"loose": true
							}],
							"transform-es2015-object-super",
							"transform-es2015-parameters",
							"transform-es2015-shorthand-properties",
							["transform-es2015-spread", {
								"loose": true
							}],
							"transform-es2015-sticky-regex",
							["transform-es2015-template-literals", {
								"loose": true
							}],
							"transform-react-constant-elements",
							"transform-react-remove-prop-types",
							"transform-react-inline-elements"
						],  
					},
				},
				{
					test: /(\.sass|\.scss)$/,
					include: [
						path.resolve(projectRoot, './src/shared/components/') ,
						path.resolve(projectRoot, './node_modules/bootstrap-sass/assets/stylesheets/') ,
					],					
					use:
						ExtractTextPlugin.extract({
							fallback: "style-loader",
							use: [
								{ loader: 'css-loader', query: { importLoaders: 2}},
								{ loader: 'postcss-loader' },
								{ loader: 'resolve-url-loader' },
								{ loader: 'sass-loader', query: {
										// sourceMap: true,
										includePaths: [
											path.resolve(projectRoot, './node_modules/bootstrap-sass/assets/stylesheets/') ,
										],
									}
								}
							],
						})
				},
				{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]" },
				{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: "file-loader?name=fonts/[name].[ext]" },
				{ test: /\.(gif|jpg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: "file-loader?name=img/[name].[ext]" },					
			]
		},
		resolveLoader: {
			modules: [
				"node_modules"
			],
		},
		resolve: {
			modules: [
				"node_modules"
			],
			unsafeCache : true,
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
						presets: ["react"],
						plugins: [
							"transform-object-rest-spread",
							"transform-class-properties",
							"transform-es2015-arrow-functions",
							"transform-es2015-block-scoped-functions",
							"transform-es2015-block-scoping",
							["transform-es2015-classes", {
								"loose": true
							}],
							["transform-es2015-computed-properties", {
								"loose": true
							}],
							"transform-es2015-destructuring",
							"transform-es2015-duplicate-keys",
							["transform-es2015-for-of", {
								"loose": true
							}],
							"transform-es2015-function-name",
							["transform-es2015-modules-commonjs", {
								"loose": true
							}],
							"transform-es2015-object-super",
							"transform-es2015-parameters",
							"transform-es2015-shorthand-properties",
							["transform-es2015-spread", {
								"loose": true
							}],
							"transform-es2015-sticky-regex",
							["transform-es2015-template-literals", {
								"loose": true
							}],
							"transform-react-constant-elements",
							"transform-react-remove-prop-types",
							"transform-react-inline-elements"
						],  				
					},
				},
			]
		},
	}
];


module.exports = config;
