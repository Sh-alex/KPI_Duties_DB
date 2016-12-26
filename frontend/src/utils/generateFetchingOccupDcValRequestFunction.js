export default function generateFetchingOccupDcValRequestFunction(params) {
    let listName = params.listName || "";
    return function fetchOccupDcVal( onSuccess, onFail, reqParams ) {
        return function (dispatch) {
            let getParams = "?" +
                "&offset=" + (reqParams && reqParams.offset || "") +
                "&limit=" + (reqParams && reqParams.limit || "") +
                "&filterStr=" + (reqParams && reqParams.filterStr || "") +
                "&sortDirection=" + (reqParams && reqParams.sortDirection || "");

            dispatch({ type: params.requestConst });

            let access_token = localStorage.jwtToken;

            return fetch( params.apiURI + getParams, {
                credentials: 'include',
                mode: 'cors',
                method: 'get',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': access_token ? 'Bearer ' + access_token : ""
                    //'X-CSRFToken': CSRF_TOKEN
                }
            })
                .then( response => {
                    if(response.status === 404)
                        throw `При отриманні списку ${listName} не знайдено відповідного методу на сервері!`;
                    if( 499 < response.status && response.status < 600 )
                        throw `При отриманні списку ${listName} сталася помилка ${response.status} на сервері!`;

                    var contentType = response.headers.get("content-type");
                    if(contentType && contentType.indexOf("application/json") !== -1)
                        return response.json();
                    else
                        throw `Отримано некоректні дані для списку ${listName}`;
                })
                .then( data => {
                    if (!(data instanceof Array) && !(data.idNameResponses instanceof Array))
                        throw `Отримано некоректні дані для списку ${listName}`;

                    dispatch({
                        type: params.successConst,
                        data: data.idNameResponses,
                        resultsOveralSize: Number.parseInt(data.resultsOveralSize) || 0,
                    });
                    if(onSuccess instanceof Function)
                        onSuccess(dispatch, {data});
                })
                .catch( error =>  {
                    if(error && error.message === "Failed to fetch")
                        error = `Сталася неочікувана помилка при отриманні списку ${listName}! Перевірте роботу мережі.`;
                    else if(!error || !(typeof error == "string"))
                        error = `Сталася неочікувана помилка при отриманні списку  ${listName}!`;

                    dispatch({
                        type: params.failConst,
                        error
                    });

                    if(onFail instanceof Function)
                        onFail(dispatch, error);
                });
        }
    }
}