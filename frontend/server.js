const Express = require('express');
const http  = require('http');
const fallback = require('express-history-api-fallback');
//const webpack = require('webpack');
//const webpackConfig = require('../webpack.config');
//const compiler = webpack(webpackConfig);
const app = new Express();
const server = new http.Server(app);
const proxy = require('http-proxy').createProxyServer({});

const STATICS_SERVER_PORT = 4000,
    API_PORT = 52300,
    SERVER_ADDRESS = "http://occupations.azurewebsites.net";
//    SERVER_ADDRESS = "http://localhost";

app.use(require('morgan')('short'));
/*  не використовується, бо WDS запускається із npm-скріпта
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
    proxy.web(req, res, { target: `${SERVER_ADDRESS}:${API_PORT || 80}` });
});

var rootPath = __dirname + '/public';
app.use('/', Express.static(rootPath));
app.use(fallback(rootPath + '/index.html' ));

server.listen(STATICS_SERVER_PORT, () => {
    console.log(`Server is listening on ${SERVER_ADDRESS}:${STATICS_SERVER_PORT}`);
});

