var webpack = require('webpack');

module.exports = {
    entry: "./frontend/main.jsx",
    output: {
        path: __dirname + '/src/main/resources/fe-build/',
        publicPath: "fe-build/",
        filename: "bundle.js"
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: "eval-source-map",
    module: {
        preLoaders: [
            {
                test: /\.jsx$/,
                loader: "source-map",
                exclude: [/node_modules/, /public/]
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: "babel?presets[]=es2015",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!autoprefixer-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!autoprefixer-loader!less",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.gif$/,
                loader: "url-loader?limit=10000&mimetype=image/gif"
            },
            {
                test: /\.jpg$/,
                loader: "url-loader?limit=10000&mimetype=image/jpg"
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            },
            {
                test: /\.svg/,
                loader: "url-loader?limit=26000&mimetype=image/svg+xml"
            },
            {
                test: /\.jsx$/,
                loader: "react-hot!babel?presets[]=es2015,presets[]=react",
                exclude: [/node_modules/, /public/]
            },
            {
                test:   /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                loader: 'file?name=[name].[ext]?[hash]'
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$': "jquery",
            'jQuery': "jquery",
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ]/*,
    devServer: {
        contentBase: __dirname + '/backend',
        target: 'https://other-server.example.com',
        hot: true,
        port: 8090
    }*/
};