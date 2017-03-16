let webpack = require('webpack');
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

let config = {
	cache: false,
	devtool: 'eval',
	context: process.cwd(),
	entry: [
		// 'eventsource-polyfill', // necessary for hot reloading with IE
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
		//HtmlWebpackPluginConfig,
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		// new ExtractTextPlugin({
		// 	filename: 'css/main.css',
		// 	disable: true,  //let's disable ExtractTextPlugin in dev mode, then HMR for sass can be use in SSR
		// 	allChunks: true
		// }),
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
				test: /(\.css)$/,
				include: [
					path.resolve(projectRoot, './src/shared/css/') ,
					path.resolve(projectRoot, './node_modules/font-awesome/css/') ,
				],
				use: [
					"style-loader",
					"css-loader"
				]	
			},
			{
				test: /(\.sass|\.scss)$/,
				include: [
					path.resolve(projectRoot, './src/shared/components/') ,
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
			"bootstrap.css": path.resolve(projectRoot, 'src/shared/css/bootstrap.min.css'),		
			"font-awesome.css": path.resolve(projectRoot, 'node_modules/font-awesome/css/font-awesome.min.css'),		
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
	// performance: {
	// 	hints: "warning"
	// }
};


module.exports = config;
