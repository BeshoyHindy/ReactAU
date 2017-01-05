var path = require("path");
var webpack = require("webpack");
require ('babel-polyfill');

var config = {
    devtool: process.env.NODE_ENV === 'production' ? null : 'inline-source-map',
    entry: {
        vendor: [path.join(__dirname, "..","src", "client", "vendors.js")]
    },
    output: {
        path: path.join(__dirname, "..", "public"),
        filename: "dll.[name].js",
        library: "[name]"
    },
    plugins: [        
        new webpack.DllPlugin({
            path: path.join(__dirname, "..", "dll", "[name]-manifest.json"),
            name: "[name]",
            context: path.resolve(__dirname, "../src/client")
        }),
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify("development"),
        // }),
    ],
    resolve: {
		modules: [
		  path.resolve(__dirname, "../src/client"),
		  "node_modules"
		]
    }
};

if (process.env.NODE_ENV === "production"){
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;