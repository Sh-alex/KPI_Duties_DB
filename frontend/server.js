const Express = require('express');
const http  = require('http');
const fallback = require('express-history-api-fallback');
const cors = require('cors');
const app = new Express();
const server = new http.Server(app);
require('es6-promise').polyfill();
require('isomorphic-fetch');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

const STATICS_SERVER_PORT = 80,
    API_PORT = 80,
    //   API_PORT = 52300,
    SERVER_ADDRESS = "http://occupations.azurewebsites.net";
//   SERVER_ADDRESS = "http://localhost";

app.use(require('morgan')('dev'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


function handleAPIResp (apiServerResp, frontEndReq, frontEndRes) {
    console.log("PROXY:\n  " + frontEndReq.method + " " + apiServerResp.url + " - " + apiServerResp.status + "\n  frontEndReq.body = ", frontEndReq.body);
    frontEndRes.status(apiServerResp.status);

    var contentType = apiServerResp.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1)
        return apiServerResp.json().then(json => frontEndRes.send(json));
    else if (contentType && contentType.indexOf('text/xml') !== -1)
        return apiServerResp.text().then(frontEndRes.send);
    else
        return apiServerResp.blob().then(frontEndRes.send).catch(e => frontEndRes.send(apiServerResp));
}

// Activate proxy for API
app.use(/\/api\/(.*)/, (req, res) => {
    fetch(SERVER_ADDRESS + ":" + API_PORT + req.originalUrl, {
        'web-security': false,
        mode: 'cors',
        method: req.method,
        body: JSON.stringify(req.body),
        headers: {
            'Accept': req.get('Accept'),
            'Content-Type': req.get('content-type')
        },
    }).then(
        apiServerResp => handleAPIResp(apiServerResp, req, res),
        apiServerResp => handleAPIResp(apiServerResp, req, res)
    );
});

var rootPath = __dirname + '/public';
app.use('/', Express.static(rootPath));
app.use(fallback(rootPath + '/index.html' ));

server.listen(STATICS_SERVER_PORT, () => {
    console.log(`Server is listening on port ${STATICS_SERVER_PORT}`);
    console.log(`Server is proxying ${SERVER_ADDRESS}:${API_PORT}`);
});
