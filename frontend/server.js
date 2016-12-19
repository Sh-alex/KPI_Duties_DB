"use strict";
require('es6-promise').polyfill();
require('isomorphic-fetch');
const http  = require('http');
const fs = require('fs');
const Express = require('express');
const fallback = require('express-history-api-fallback');
const cors = require('cors');
const nodeExcel = require('excel-export');
const app = new Express();
const server = new http.Server(app);
const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data
const morgan = require('morgan');
const moment = require('moment');

const STATICS_SERVER_PORT = 80,
    API_PORT = 80,
    //API_PORT = 52300,
    SERVER_ADDRESS = "http://occupations.azurewebsites.net",
    //SERVER_ADDRESS = "http://localhost",
    SEARCH_OCCUPATION_URI = '/api/occupations';

var logFileStream = fs.createWriteStream(__dirname + '/node_server_log.log', {flags: 'a'});


function handleAPIResp (apiServerResp, frontEndReq, frontEndRes) {
    console.log("PROXY:\n  " + frontEndReq.method + " " + apiServerResp.url + " - " + apiServerResp.status + "\n  frontEndReq.body = ", frontEndReq.body);
    frontEndRes.status(apiServerResp.status);

    var contentType = apiServerResp.headers.get("content-type");
    if (!contentType)
        frontEndRes.send(apiServerResp);
    else if(contentType && contentType.indexOf("application/json") !== -1)
        return apiServerResp.json().then(function(json) {
            frontEndRes.send(json)
        });
    else if (contentType && contentType.indexOf('text/xml') !== -1)
        return apiServerResp.text()
            .then(function(text) {
                frontEndRes.send(text)
            });
    else
        return apiServerResp.blob()
            .then(function(blob) {
                frontEndRes.send(blob)
            }).catch(function(e) {
                frontEndRes.send(apiServerResp)
            });
}

function generanteExcelFile(foundOccupations, occupIds, fieldsArr) {
    var fieldsHashTable = {
        "occupationName": {
            "fieldCaption": "Назва посади",
            generateCellData(dataSource) {
                return dataSource.occupationName;
            }
        },
        "occupationNameMin": {
            "fieldCaption": "Скорочена назва посади",
            generateCellData(dataSource) {
                return dataSource.occupationNameMin;
            }
        },
        "occupationGroup": {
            "fieldCaption": "Посадовий склад",
            generateCellData(dataSource) {
                return dataSource.occupationGroupName || "?";
            }
        },
        "qualiffRequirText": {
            "fieldCaption": "Кваліфікаційні вимоги: текст",
            generateCellData(dataSource) {
                return dataSource.qualiffRequir && dataSource.qualiffRequir.length &&
                    dataSource.qualiffRequir.reduce((res, currEl) => {
                        return (new Date(currEl.portionStartDate) > new Date(res.portionStartDate)) ? currEl : res;
                    }).text || "-";
            }
        },
        "qualiffRequirStartDate": {
            "fieldCaption": "Кваліфікаційні вимоги: дата прийняття тексту",
            generateCellData(dataSource) {
                if(!dataSource.qualiffRequir || !dataSource.qualiffRequir.length)
                    return "-";
                var d = Math.max.apply(this,dataSource.qualiffRequir.map(el => new Date(el.portionStartDate)));
                return d && moment(d).format('DD.MM.YYYY') || "-";
            }
        },
        "qualiffRequirEndDate": {
            "fieldCaption": "Кваліфікаційні вимоги: дата відміни тексту",
            generateCellData(dataSource) {
                if(!dataSource.qualiffRequir || !dataSource.qualiffRequir.length)
                    return "-";
                var d = Math.max.apply(this,dataSource.qualiffRequir.map(el => new Date(el.portionEndDate)));
                return d && moment(d).format('DD.MM.YYYY') || "-";
            }
        },
        "responsibilitiesText": {
            "fieldCaption": "Завдання, обов'язки та повноваження: текст",
            generateCellData(dataSource) {
                return dataSource.responsibilities && dataSource.responsibilities.length &&
                    dataSource.responsibilities.reduce((res, currEl) => {
                        return (new Date(currEl.portionStartDate) > new Date(res.portionStartDate)) ? currEl : res;
                    }).text || "-";
            }
        },
        "responsibilitiesStartDate": {
            "fieldCaption": "Завдання, обов'язки та повноваження: дата прийняття тексту",
            generateCellData(dataSource) {
                if(!dataSource.responsibilities || !dataSource.responsibilities.length)
                    return "-";
                var d = Math.max.apply(this, dataSource.responsibilities.map(el => new Date(el.portionStartDate)));
                return d && moment(d).format('DD.MM.YYYY') || "-";
            }
        },
        "responsibilitiesEndDate": {
            "fieldCaption": "Завдання, обов'язки та повноваження: дата відміни тексту",
            generateCellData(dataSource) {
                if(!dataSource.responsibilities || !dataSource.responsibilities.length)
                    return "-";
                var d = Math.max.apply(this,dataSource.responsibilities.map(el => new Date(el.portionEndDate)));
                return d && moment(d).format('DD.MM.YYYY') || "-";
            }
        },
        "haveToKnowText": {
            "fieldCaption": "Повинен знати: текст",
            generateCellData(dataSource) {
                return dataSource.haveToKnow && dataSource.haveToKnow.length &&
                    dataSource.haveToKnow.reduce((res, currEl) => {
                        return (new Date(currEl.portionStartDate) > new Date(res.portionStartDate)) ? currEl : res;
                    }).text || "-";
            }
        },
        "haveToKnowStartDate": {
            "fieldCaption": "Повинен знати: дата прийняття тексту",
            generateCellData(dataSource) {
                if(!dataSource.haveToKnow || !dataSource.haveToKnow.length)
                    return "-";
                var d = Math.max.apply(this,dataSource.haveToKnow.map(el => new Date(el.portionStartDate)));
                return d && moment(d).format('DD.MM.YYYY') || "-";
            }
        },
        "haveToKnowEndDate": {
            "fieldCaption": "Повинен знати: дата відміни тексту",
            generateCellData(dataSource) {
                if(!dataSource.haveToKnow || !dataSource.haveToKnow.length)
                    return "-";
                var d = Math.max.apply(this,dataSource.haveToKnow.map(el => new Date(el.portionEndDate)));
                return d && moment(d).format('DD.MM.YYYY') || "-";
            }
        },
        "codeDKHP": {
            "fieldCaption": "Код ДКХП",
            generateCellData(dataSource) {
                return dataSource.codes &&
                    dataSource.codes.map(el => (el.codeDKHP && el.codeDKHP.val || "") + "; ").join("") || "-"
            }
        },
        "codeETDK": {
            "fieldCaption": "Код ЄТДК",
            generateCellData(dataSource) {
                return dataSource.codes &&
                    dataSource.codes.map(el => (el.codeETDK && el.codeETDK.val || "") + "; ").join("") || "-"
            }
        },
        "codeKP": {
            "fieldCaption": "Код КП",
            generateCellData(dataSource) {
                return dataSource.codes &&
                    dataSource.codes.map(el => (el.codeKP && el.codeKP.val || "") + "; ").join("") || "-"
            }
        },
        "codeZKPPTR": {
            "fieldCaption": "Код ЗКППТР",
            generateCellData(dataSource) {
                return dataSource.codes &&
                    dataSource.codes.map(el => (el.codeZKPPTR && el.codeZKPPTR.val || "") + "; ").join("") || "-"
            }
        },
        "codesStartDate": {
            "fieldCaption": "Дата прийняття кодів",
            generateCellData(dataSource) {
                if(!dataSource.codes || !dataSource.codes.length)
                    return "-";
                var d = Math.max.apply(this, dataSource.codes.map(el => new Date(el.portionStartDate)));
                return d && moment(d).format('DD.MM.YYYY') || "-";
            }
        },
        "codesEndDate": {
            "fieldCaption": "Дата відміни кодів",
            generateCellData(dataSource) {
                if(!dataSource.codes || !dataSource.codes.length)
                    return "-";
                var d = Math.max.apply(this, dataSource.codes.map(el => new Date(el.portionEndDate)));
                return d && moment(d).format('DD.MM.YYYY') || "-";
            }
        },
        "durationsStartDate": {
            "fieldCaption": "Дати створення посади",
            generateCellData(dataSource) {
                var d = Math.max.apply(this, dataSource.durations.map(el => new Date(el.start)));
                return d && moment(d).format('DD.MM.YYYY') || "-";
            }
        },
        "durationsStopDate": {
            "fieldCaption": "Дати відміни посади",
            generateCellData(dataSource) {
                var d = Math.max.apply(this, dataSource.durations.map(el => new Date(el.stop)));
                return d && moment(d).format('DD.MM.YYYY') || "-";
            }
        },
        "inKpi": {
            "fieldCaption": "Приналежність до КПІ",
            generateCellData(dataSource) {
                return dataSource.durations.some(el => el.inKpi) && "Так" || "Ні";
            }
        }
    };

    //Перевірка переданих даних на коректність
    if(!occupIds || !occupIds.length)
        throw ( {_error: `Передано некоректний параметр occupIds, очікувався список формату "0,10,8,43,16".`} );
    if(!fieldsArr || !fieldsArr.length)
        throw ( {_error: `Передано некоректний параметр fields, очікувався список ідентифікаторів полів формату "inKpi,occupationGroup,occupationName,occupationNameMin,qualiffRequirText".`} );
    fieldsArr.map( fieldId => {
        if (!fieldsHashTable[fieldId])
            throw ( {_error: `Отримано невідомий ідентифікатор поля "${fieldId}" у переданих параметрах.`} );
    });
    occupIds.map( occupId => {
        if (!foundOccupations.itemsById[occupId])
            throw ( {_error: `Отримано невідомий ідентифікатор посади "${occupId}" у переданих параметрах.`} );
    });

    //Example of API at https://www.npmjs.com/package/excel-export
    return nodeExcel.execute({
        cols: fieldsArr.map( fieldId => {
            return {
                caption: fieldsHashTable[fieldId].fieldCaption,
                type:'string',
                width: 300//fieldsHashTable[fieldId].fieldCaption.length + 2 + "pt"
            }
        }),
        rows: occupIds.map( occupId => {
            return fieldsArr.map( fieldId => {
                return fieldsHashTable[fieldId].generateCellData(foundOccupations.itemsById[occupId].data);
            })
        })
    });
}

function proxyJavaServer(req, res) {
    return fetch(SERVER_ADDRESS + ":" + API_PORT + req.originalUrl, {
        'web-security': false,
        mode: 'cors',
        method: req.method,
        body: JSON.stringify(req.body),
        headers: req.headers,
    }).then(
        function(apiServerResp) {
            handleAPIResp(apiServerResp, req, res)
        },
        function(apiServerResp) {
            handleAPIResp(apiServerResp, req, res)
        }
    ).catch(function(e) {
        res.send(e)
    });
}



app.use( morgan('dev', {stream: logFileStream}) );

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//API для генерації EXCEL-файла із результатами пошуку
app.get('/api/occupations/downloadSearchResults', function(req, res) {
    if(!req.headers.authorization)
        req.headers.authorization = req.query.a;    //якщо не передали як хедер, мб передали як параметр юрл
    fetch(`${SERVER_ADDRESS}:${API_PORT}${SEARCH_OCCUPATION_URI}?occupIds=${req.query.occupIds}`, {
        mode: 'cors',
        method: "get",
        headers: req.headers,
    })
        .then((response) => {
            console.log("DOWNLOAD SEARCH RESULTS: :\n  " + req.method + " " + response.url + " - " + response.status);
            res.status(response.status);

            var contentType = response.headers.get("content-type");
            if (response.ok || response.status == 400) {
                if (contentType && contentType.indexOf("application/json") !== -1)
                    return response.json();
                else
                    throw {_error: 'Отримано некоректну відповідь із результатами пошуку від сервера API: очікувався JSON'}
            }
            else if (response.status === 401)
                throw( {_error: `Відмовлено у доступі неавторизованому користувачу!`} );
            else if (response.status === 404)
                throw( {_error: 'Не знайдено відповідного методу при отриманні інформації від сервера API!'} );
            else if (499 < response.status && response.status < 600)
                throw( {_error: `Сталася помилка ${response.status} на сервері API!`} );
            else
                throw( {_error: 'Сталася невідома помилка при отриманні інформації від сервера API!'} );
        })
        .then(json => {
            if (json && json.foundOccupations) {
                res.setHeader('Content-Type', 'application/vnd.openxmlformats');
                res.setHeader("Content-Disposition", `attachment; filename=Search_results_${(new Date()).toJSON()}.xlsx`);
                try {
                    var excelFile = generanteExcelFile(json.foundOccupations, req.query.occupIds.split(","), req.query.fields.split(","));
                    res.end(excelFile, 'binary');
                } catch(e) {
                    throw ( {_error: 'При генерації файлу сталася помилка: '+e} );
                }
            }
            else if (json && json._error)
                throw json;
            else
                throw ( {_error: 'Отримано некоректний результат від сервера API'} );
        })
        .catch(function(error) {
            var errorText = error && error._error || 'Сталася невідома помилка :(';
            res.setHeader('Content-Type', 'text/plain');
            res.send(errorText);
        });
});

// Activate proxy for API
app.use(/\/oauth\/(.*)/, proxyJavaServer);
app.use(/\/api\/(.*)/, proxyJavaServer);

var rootPath = __dirname + '/public';
app.use('/', Express.static(rootPath));
app.use(fallback(rootPath + '/index.html' ));

server.listen(STATICS_SERVER_PORT, function() {
    console.log(`Server is listening on port ${STATICS_SERVER_PORT}`);
    console.log(`Server is proxying ${SERVER_ADDRESS}:${API_PORT}`);
});
