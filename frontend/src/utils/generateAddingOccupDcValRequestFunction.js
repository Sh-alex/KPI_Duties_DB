export default function generateAddingOccupDcValRequestFunction(params) {
    let listName = params.listName || "";
    return function addNewOccupDcVal( { newVal, onSuccess, onFail } ) {
        return function (dispatch) {
            dispatch({
                type: params.requestConst,
                newVal,
            });
            let access_token = localStorage.jwtToken;

            return fetch( params.apiURI, {
                credentials: 'include',
                mode: 'cors',
                method: 'post',
                body: JSON.stringify( { newVal } ),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': access_token ? 'Bearer ' + access_token : ""
                    //'X-CSRFToken': CSRF_TOKEN
                }
            })
                .then( response => {
                    if(response.status === 400)
                        throw `При додаванні нового значення до списку ${listName} на сервер передано некоректні дані!`;
                    if(response.status === 404)
                        throw `При додаванні нового значення до списку ${listName} не знайдено відповідного методу на сервері!`;
                    if( 499 < response.status && response.status < 600 )
                        throw `При додаванні нового значення до списку ${listName} сталася помилка ${response.status} на сервері!`;

                    var contentType = response.headers.get("content-type");
                    if(contentType && contentType.indexOf("application/json") !== -1) {
                        return response.json();
                    }
                    throw `При додаванні нового значення до списку ${listName} не отримано ідентифікатор нового запису від сервера!`;
                })
                .then( json => {
                    let createdId = json.id,
                        error = json.error;
                    if(createdId == undefined)
                        throw `При додаванні нового значення до списку ${listName} не отримано ідентифікатор нового запису від сервера!`;
                    if(error)
                        throw error;

                    let resObj = {
                        "id": createdId,
                        "textValue": newVal,
                        "usingOccupations": []
                    };
                    dispatch({
                        type: params.successConst,
                        newItem: resObj
                    });

                    if(onSuccess instanceof Function)
                        onSuccess(dispatch, resObj);
                })
                .catch( error => {
                    if(error && error.message === "Failed to fetch")
                        error = `Сталася неочікувана помилка при додаванні нового значення до списку ${listName}! Перевірте роботу мережі.`;
                    else if(!error || !(typeof error == "string"))
                        error = `Сталася неочікувана помилка при додаванні нового значення до списку ${listName}!`;

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