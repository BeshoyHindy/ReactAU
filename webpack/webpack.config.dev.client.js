let webpack = require('webpack');
// let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
let path  = require( 'path');
let ExtractTextPlugin  = require( 'extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const webpack_dev_server = require('../.config/configuration').webpack_dev_server;

const port = webpack_dev_server.http.port;
const host = webpack_dev_server.http.host;


let projectRoot = process.cwd();
let assetsPath = path.join(projectRoot,   "public", "build");
let publicPath = `${host}:${port}/build/`;
let distPath = projectRoot;

let config = 
{
	cache: false,
	devtool: 'eval',
	context: process.cwd(),
	entry: {
		bundle: [
			'react-hot-loader/patch',
			`webpack-hot-middleware/client?reload=true&path=${host}:${port}/__webpack_hmr`, //note that it reloads the page if hot module reloading fails.
			path.resolve(projectRoot, './src/client/index.js'),
		]
	},
	target: 'web',
	output: {
		path: assetsPath, // Note: Physical files are only output by the production build task `npm run build`.
		publicPath: publicPath,
		filename: '[name].js',
		chunkFilename: 'chunk-[name].js'
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
		new ExtractTextPlugin({
			filename: "css/[name].css",
			disable: false,
			allChunks: true
		}),		
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DllReferencePlugin({
			context: path.join(projectRoot, "src" , "client"),
			manifest: require("../dll/vendor-manifest.json")
		}),
        new AssetsPlugin({fullPath: true})	
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
					presets: [['es2015', {modules: false, loose: true}], "react"],
					plugins: [
						"react-hot-loader/babel",
						"syntax-dynamic-import",
						"transform-object-rest-spread",
						"transform-class-properties",						
					], 
				},
			},
			{
				test: /(\.css)$/,
				include: [
					path.resolve(projectRoot, './src/shared/css/') ,
					path.resolve(projectRoot, './node_modules/font-awesome/css/') ,
				],
				loader: "file-loader?name=css/[name].[ext]" ,
			},
			{
				test: /(\.sass|\.scss)$/,
				include: [
					path.resolve(projectRoot, './src/shared/Sass/') ,
				],
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{ loader: 'raw-loader', query: { importLoaders: 2}},
						{ loader: 'sass-loader'},
					],
				})
			},
			{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/i, 
				loader: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]" ,
				include: [
					path.resolve(projectRoot, './src/shared/fonts/') ,
					path.resolve(projectRoot, './node_modules/bootstrap/dist/fonts/') ,
					path.resolve(projectRoot, './node_modules/font-awesome/fonts/') ,
				],				
			},
			{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, 
				loader: "file-loader?name=fonts/[name].[ext]" ,
				include: [
					path.resolve(projectRoot, './src/shared/fonts/') ,
					path.resolve(projectRoot, './node_modules/bootstrap/dist/fonts/') ,
					path.resolve(projectRoot, './node_modules/font-awesome/fonts/') ,
				],
			},	
			{ test: /\.(gif|tif|tiff|jpg|png|jpeg|ico)$/i, 
				loader: "file-loader?name=img/[path][name].[ext]&context=" + path.resolve(projectRoot, './src/shared/img') ,
				include: [
					path.resolve(projectRoot, './src/shared/img/') ,
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
			"bootstrap.css": path.resolve(projectRoot, './src/shared/css/bootstrap.min.css'),		
			"font-awesome.css": path.resolve(projectRoot, 'node_modules/font-awesome/css/font-awesome.min.css'),		
			"font-awesome.fonts": path.resolve(projectRoot, 'node_modules/font-awesome/fonts'),
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
