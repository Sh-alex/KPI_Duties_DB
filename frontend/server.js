const Express = require('express');
const http  = require('http');
const fallback = require('express-history-api-fallback');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const compiler = webpack(webpackConfig);
const app = new Express();
const server = new http.Server(app);
const proxy = require('http-proxy').createProxyServer({});

const port = 80,
    API_PORT = 52300,
    serverAdress = "http://localhost";

app.use(require('morgan')('short'));
/*
if (process.env.NODE_ENV === 'development') {
    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true, publicPath: webpackConfig.output.publicPath,
    }));

    app.use(require('webpack-hot-middleware')(compiler, {
        log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
    }));
}
*/
proxy.on('error', (err, req) => {
    console.error(err, req.url);
});

// Activate proxy for session
app.use(/\/api\/(.*)/, (req, res) => {
    req.url = req.originalUrl;
    proxy.web(req, res, { target: `${serverAdress}:${API_PORT || 80}` });
});

var rootPath = __dirname + '/../frontend-public';
app.use('/', Express.static(rootPath));
app.use(fallback(rootPath + '/index.html' ));

server.listen(port, () => {
    console.log(`Server is listening on ${serverAdress}:${port}`);
});

