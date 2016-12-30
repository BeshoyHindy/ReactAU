var path = require("path");
var webpack = require("webpack");
require ('babel-polyfill');

module.exports = {
    entry: {
        vendor: [path.join(__dirname, "src", "client", "vendors.js")]
    },
    output: {
        path: path.join(__dirname, "dist", "public","dll"),
        filename: "dll.[name].js",
        library: "[name]"
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DllPlugin({
            path: path.join(__dirname, "dist","dll", "[name]-manifest.json"),
            name: "[name]",
            context: path.resolve(__dirname, "./src/client")
        }),
		// new webpack.DefinePlugin({
		// 	'process.env': {
		// 		NODE_ENV: JSON.stringify("production"),
		// 	},
		// }),	        
    ],
    resolve: {
		modules: [
		  path.resolve(__dirname, "./src/client"),
		  "node_modules"
		]
    }
};