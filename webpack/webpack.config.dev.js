import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
//import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';

/*
var info = autoprefixer().info();
console.log(info);
*/

// let HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
// 	title: 'ChingChingTest',
// 	template: path.resolve(__dirname, './src/client/index.html'),
// 	filename: 'index.html',
// 	inject: 'body'
// });
var projectRoot = process.cwd(); 
var assetsPath = path.join(projectRoot,  "dist", "public");
var publicPath = "/";


export default {
	cache: true,
	devtool: 'inline-eval-cheap-source-map',
	context: process.cwd(),
	entry: [
		'react-hot-loader/patch',
		'webpack-hot-middleware/client?reload=true',
		path.resolve(projectRoot, './src/client/index.js')
	],
	target: 'web',
	output: {
		path: assetsPath, // Note: Physical files are only output by the production build task `npm run build`.
		publicPath: publicPath,
		filename: 'bundle.js',
        library: "[name]_[hash]"		
	},
	plugins: [
		new webpack.DefinePlugin({
		'process.env': {
			BROWSER: true,
			NODE_ENV: JSON.stringify('development')
		},
		__CLIENT__: true,
		__SERVER__: false,
		__DEVELOPMENT__: true,
		__DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
		}),
		//HtmlWebpackPluginConfig,
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
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
					plugins: ['react-hot-loader/babel'],
				},
			},
			{
				test: /(\.sass|\.scss)$/,
				loader:
					ExtractTextPlugin.extract({
						fallbackLoader: "style-loader",
						loader: [
							{ loader: 'css-loader', query: { sourceMap: true/*, importLoaders: 2, localIdentName: '[name]__[local]__[hash:base64:5]' */} },
							{ loader: 'resolve-url-loader' },
							{ loader: 'postcss-loader' },
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
};
