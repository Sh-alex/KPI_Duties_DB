export default function generateEditingOccupDcValRequestFunction(params) {
    let listName = params.listName || "";
    return function editOccupDcVal( { newVal, id, onSuccess, onFail } ) {
        return function (dispatch) {
            dispatch({
                type: params.requestConst,
                newVal,
                id
            });

            return fetch( params.apiURI + id, {
                credentials: 'include',
                mode: 'cors',
                method: 'put',
                body: JSON.stringify( { newVal } ),
                headers: {
                    'Content-Type': 'application/json',
                    //'X-CSRFToken': CSRF_TOKEN
                }
            })
                .then( response => {
                    if(response.status === 400)
                        throw `При редагуванні значення списку ${listName} на сервер передано некоректні дані!`;
                    if(response.status === 404)
                        throw `При редагуванні значення списку ${listName} не знайдено відповідного методу на сервері!`;
                    if( 499 < response.status && response.status < 600 )
                        throw `При редагуванні значення списку ${listName} сталася помилка ${response.status} на сервері!`;

                    if(response.status == 200) {
                        dispatch({
                            type: params.successConst,
                            id,
                            newVal
                        });

                        if(onSuccess instanceof Function)
                            onSuccess(dispatch, {id, newVal});
                    }
                    else
                        throw `Не вдалося змінити вказане значення списку ${listName}!`;
                })
                .catch( error => {
                    dispatch({
                        type: params.failConst,
                        error: error || `Сталася неочікувана помилка при редагуванні значення списку ${listName}!`
                    });

                    if(onFail instanceof Function)
                        onFail(dispatch, error);
                });
        }
    }
}