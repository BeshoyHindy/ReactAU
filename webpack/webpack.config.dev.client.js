let webpack = require('webpack');
// let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
let path  = require( 'path');
let ExtractTextPlugin  = require( 'extract-text-webpack-plugin');

//http://stackoverflow.com/questions/36854862/redux-hot-reload-warning-on-changes
const web_server = require('../.config/configuration').web_server;

const port = web_server.http.port || 3002;
const host = web_server.http.host || 'localhost';


let projectRoot = process.cwd();
let assetsPath = path.join(projectRoot,   "public", "build");
let publicPath = `http://${host}:${port}/build/`;
let distPath = projectRoot;

let config = 
{
	cache: false,
	devtool: 'eval',
	context: process.cwd(),
	entry: [
		'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
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
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DllReferencePlugin({
			context: path.join(projectRoot, "src" , "client"),
			manifest: require("../dll/vendor-manifest.json")
		}),
		// new BundleAnalyzerPlugin({
		// 	analyzerMode: 'static'
		// }),		
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
					babelrc: false,
					presets: ["react"],
					plugins: [
						"transform-object-rest-spread",
						"transform-class-properties",
						"syntax-dynamic-import",
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
					],  				

				},
			},
			{
				test: /(\.sass|\.scss)$/,
				include: [
					path.resolve(projectRoot, './src/shared/components/') ,
					path.resolve(projectRoot, './node_modules/bootstrap-sass/assets/stylesheets/') ,
				],
				use: [
					"style-loader",
					"css-loader",
					"sass-loader"
				]	
			},
			{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/i, 
				loader: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]" ,
				include: [
					path.resolve(projectRoot, './src/shared/fonts/') ,
					path.resolve(projectRoot, './node_modules/bootstrap-sass/assets/fonts/') ,
					path.resolve(projectRoot, './node_modules/font-awesome/fonts/') ,
				],				
			},
			{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, 
				loader: "file-loader?name=fonts/[name].[ext]" ,
				include: [
					path.resolve(projectRoot, './src/shared/fonts/') ,
					path.resolve(projectRoot, './node_modules/bootstrap-sass/assets/fonts/') ,
					path.resolve(projectRoot, './node_modules/font-awesome/fonts/') ,
				],
			},	
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
		alias: {
			// "react-router-redux": path.resolve(projectRoot, '../react-router/packages/react-router-redux/'),		
			// "react-router": path.resolve(projectRoot, '../react-router/packages/react-router/'),		
			// "react-router-dom": path.resolve(projectRoot, '../react-router/packages/react-router-dom/'),		
		},
		unsafeCache : true,
	},
	profile: true,
	stats: {
		hash: true,
		version: true,
		timings: true,
		assets: false,
		chunks: true,
		modules: true,
		reasons: true,
		children: false,
		source: false,
		errors: true,
		errorDetails: true,
		warnings: true,
		publicPath: true,
		colors: true
	},
};



module.exports = config;
