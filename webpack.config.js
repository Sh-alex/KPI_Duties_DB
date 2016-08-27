var webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    isDev = process.env.NODE_ENV != "production",
    WDS_PORT = 2016,
    BE_PORT = 8080;

module.exports = {
    entry: ([
        'babel-polyfill',
        "./frontend/main.jsx"
    ]),
    output: {
        path: __dirname + '/src/main/webapp/WEB-INF/frontend-build/',
        publicPath: "/src/main/webapp/WEB-INF/frontend-build/",
        filename: "bundle.js"
    },
    watch: isDev,
    watchOptions: {
        aggregateTimeout: 100
    },
    cache: isDev,
    debug: isDev,
    devtool: isDev ? "source-map" : null,
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: "source-map",
                exclude: [/node_modules/]
            }
        ],
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style", "css!autoprefixer"),
                exclude: [/node_modules/]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style", "css"),
                include: [/node_modules/]
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style", isDev? "css?sourceMap!autoprefixer!less?sourceMap" : "css!autoprefixer!less")
            },
            {
                test: /\.(jsx|js)?$/,
                exclude: [/node_modules/],
                loader: "babel-loader",
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            {
                test: /\.woff(\?[a-z0-9=\.]+)?$/,
                loader: 'url?limit=10000000&mimetype=application/font-woff'
            },
            {
                test: /\.woff2(\?[a-z0-9=\.]+)?$/,
                loader: 'url?limit=10000000&mimetype=application/font-woff2'
            },
            {
                test: /\.ttf(\?[a-z0-9=\.]+)?$/,
                loader: 'url?limit=10000000&mimetype=application/octet-stream'
            },
            {
                test: /\.otf(\?[a-z0-9=\.]+)?$/,
                loader: 'url?limit=10000000&mimetype=application/font-otf'
            },
            {
                test: /\.svg(\?[a-z0-9=\.]+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.gif$/,
                loader: "url-loader?limit=10000&mimetype=image/gif"
            },
            // {
            //     test: /\.jpe?g$/,
            //     loader: "url-loader?limit=10000&mimetype=image/jpg"
            // },
            {
                test: /\.png$/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            },
            {
            	test: /.(png|jpg|jpeg|gif|eot|svg)(\?[a-z0-9=\.]+)?$/,
                loader: 'file-loader?name=[path][name].[ext]\?[hash]'
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    },
    plugins: (isDev ? [ ] : [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {screw_ie8: true, keep_fnames: true, warnings: false},
            mangle: {screw_ie8: true, keep_fnames: true}
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ]).concat([
        new ExtractTextPlugin("style.css", {allChunks: true, disable: isDev}),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ]),
    devServer: !isDev ? null : {
        historyApiFallback: { index: '/src/main/webapp/WEB-INF/views/index.html' },
        proxy: {
            "/api*": {
                target : `http://localhost:${BE_PORT}`,
                changeOrigin: true,
                secure: false
            }
        },
        hot: true,
        port: WDS_PORT
    }
};