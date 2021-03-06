
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var HtmlWebpackPlugin  = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const AssetsPlugin = require('assets-webpack-plugin');

var projectRoot = process.cwd();
var assetsPath = process.cwd() + "/public/build";
var publicPath = "/build/";
var distPath = projectRoot;

//https://github.com/webpack/webpack/issues/1081
var config = [{
    name: "browser",
    cache: false,
    context: process.cwd(),
    entry: {
        bundle: [
        path.resolve(projectRoot, './src/client/index.js'),
        require.resolve('./util/polyfills')]
    },
    target: 'web',
    output: {
        path: assetsPath,
        publicPath: publicPath,
        filename: '[name]-[chunkhash].js',
        chunkFilename: 'chunk-[name]-[chunkhash].js'
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
        filename: "css/[name].css",
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
    new CleanWebpackPlugin(['public/build'], {
        root: projectRoot,
        verbose: true,
    }),
    // new BundleAnalyzerPlugin({
    // 	analyzerMode: 'static'
    // }),
    new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: function(module) {
            return module.context && module.context.indexOf("node_modules") !== -1;
        }
    }),
    // Generate a 'manifest' chunk to be inlined in the HTML template
    new webpack.optimize.CommonsChunkPlugin({
        name: "manifest",
        minChunks: Infinity
    }),

    // Need this plugin for deterministic hashing
    // until this issue is resolved: https://github.com/webpack/webpack/issues/1315
    // for more info: https://webpack.js.org/how-to/cache/
    new WebpackMd5Hash(),
    new AssetsPlugin({
        fullPath: true
    })],
    module: {
        rules: [{
            test: /(\.jsx)|(\.js)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            include: [
            path.join(projectRoot, "src", "shared"),
            path.join(projectRoot, "src", "client") //important for performance!
            ],
            options: {
                cacheDirectory: true,
                babelrc: false,
                presets: [
                    ['es2015', {
                        modules: false,
                        loose: true
                    }], "react"],
                plugins: ["syntax-dynamic-import", "transform-object-rest-spread", "transform-class-properties", "transform-react-constant-elements", "transform-react-remove-prop-types", "transform-react-inline-elements"],
            },
        }, {
            test: /(\.css)$/,
            include: [
            path.resolve(projectRoot, './src/shared/css/'),
            path.resolve(projectRoot, './node_modules/font-awesome/css/'), ],
            loader: "file-loader?name=css/[name].[ext]",
        }, {
            test: /(\.sass|\.scss)$/,
            include: [
            path.resolve(projectRoot, './src/shared/Sass/'), ],
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: 'css-loader',
                    query: {
                        importLoaders: 2
                    }
                }, {
                    loader: 'postcss-loader'
                }, {
                    loader: 'resolve-url-loader'
                }, {
                    loader: 'sass-loader'
                }, ],
            })
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
            loader: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]",
            include: [
            path.resolve(projectRoot, './src/shared/fonts/'),
            path.resolve(projectRoot, './node_modules/bootstrap/dist/fonts/'),
            path.resolve(projectRoot, './node_modules/font-awesome/fonts/'), ],
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
            loader: "file-loader?name=fonts/[name].[ext]",
            include: [
            path.resolve(projectRoot, './src/shared/fonts/'),
            path.resolve(projectRoot, './node_modules/bootstrap/dist/fonts/'),
            path.resolve(projectRoot, './node_modules/font-awesome/fonts/'), ],
        }, {
            test: /\.(gif|tif|tiff|jpg|png|jpeg|ico)$/i,
            loader: "file-loader?name=img/[path][name].[ext]&context=" + path.resolve(projectRoot, './src/shared/img'),
            include: [
            path.resolve(projectRoot, './src/shared/img/'), ],
        }, ]
    },
    resolveLoader: {
        modules: ["node_modules"],
    },
    resolve: {
        modules: ["node_modules"],
        alias: {
            "bootstrap.css": path.resolve(projectRoot, './src/shared/css/bootstrap.min.css'),
            "font-awesome.css": path.resolve(projectRoot, './node_modules/font-awesome/css/font-awesome.min.css'),
            "font-awesome.fonts": path.resolve(projectRoot, 'node_modules/font-awesome/fonts'),
        },
        unsafeCache: true,
    },
}, {
    // The configuration for the server-side rendering
    name: "server-side rendering",
    entry: "./src/server/server.js",
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
        rules: [{
            test: /(\.jsx)|(\.js)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            include: [
            path.join(projectRoot, "src") //important for performance!
            ],
            options: {
                cacheDirectory: true,
                babelrc: false,
                presets: [
                    ['es2015', {
                        modules: false,
                        loose: true
                    }], "react"],
                plugins: ["transform-object-rest-spread", "transform-class-properties", "syntax-dynamic-import", "transform-react-constant-elements", "transform-react-remove-prop-types", "transform-react-inline-elements"],
            },
        }, ]
    },
}];


module.exports = config; 
