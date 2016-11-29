export default function generateDelOccupDcValRequestFunction(params) {
    let listName = params.listName || "";
    return function delOccupDcVal( { id, onSuccess, onFail } ) {
        return function (dispatch) {
            dispatch({
                type: params.requestConst,
                id,
            });
            let access_token = localStorage.jwtToken;

            return fetch( params.apiURI + id, {
                credentials: 'include',
                mode: 'cors',
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': access_token ? 'Bearer ' + access_token : ""
                    //'X-CSRFToken': CSRF_TOKEN
                }
            })
                .then( response => {
                    if(response.status === 400)
                        throw `При видаленні значення зі списку ${listName} на сервер передано некоректні дані!`;
                    if(response.status === 404)
                        throw `При видаленні значення зі списку ${listName} не знайдено відповідного методу на сервері!`;
                    if( 499 < response.status && response.status < 600 )
                        throw `При видаленні значення зі списку ${listName} сталася помилка ${response.status} на сервері!`;

                    if(response.ok) {
                        dispatch({
                            type: params.successConst,
                            id
                        });

                        if(onSuccess instanceof Function)
                            onSuccess(dispatch, {id});
                    }
                    else
                        throw `Не вдалося видалити вказане значення зі списку ${listName}! Код відповіді сервера = ${response.status}`;
                })
                .catch( error => {
                    if(error && error.message === "Failed to fetch")
                        error = `Сталася неочікувана помилка при видаленні значення зі списку ${listName}! Перевірте роботу мережі.`;
                    else if(!error || !(typeof error == "string"))
                        error = `Сталася неочікувана помилка при видаленні значення зі списку ${listName}!`;

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