import {
    ADD_INFO_FROM_ANOTHER_OCCUP_SEARCH_FORM_SUBMIT_REQUEST,
    ADD_INFO_FROM_ANOTHER_OCCUP_SEARCH_FORM_SUBMIT_FAIL,
    ADD_INFO_FROM_ANOTHER_OCCUP_SEARCH_FORM_SUBMIT_SUCCESS,
    HIDE_MODAL_ADD_INFO_FROM_ANOTHER_OCCUP,
    SHOW_MODAL_ADD_INFO_FROM_ANOTHER_OCCUP
} from '../constants/addingInfoFromAnotherOccup'

import SEARCH_OCCUPATION from '../constants/API_URIs';

function submitFormRequest (data) {
    return {
        type: ADD_INFO_FROM_ANOTHER_OCCUP_SEARCH_FORM_SUBMIT_REQUEST,
        data
    }
}

function submitFormSuccess (response) {
    return {
        type: ADD_INFO_FROM_ANOTHER_OCCUP_SEARCH_FORM_SUBMIT_SUCCESS,
        response
    }
}

function submitFormFail (error) {
    return {
        type: ADD_INFO_FROM_ANOTHER_OCCUP_SEARCH_FORM_SUBMIT_FAIL,
        error
    }
}

export function submitFormAddInfoFromAnotherOccup(data, dispatch) {
    dispatch(submitFormRequest(data));
    
    //TODO: виділити у окремий action для пошуку посад
    return new Promise((resolve, reject) => {
        return fetch( SEARCH_OCCUPATION, {
            credentials: 'include',
            mode: 'cors',
            method: 'get',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': CSRF_TOKEN
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    dispatch(submitFormSuccess(response));
                    resolve();
                }
                else if (response.status === 400) {
                    // here I expect that the server will return the shape:
                    // {
                    //   field1: 'error text',
                    //   field2: 'error text',
                    //   _error: 'Overall error text'
                    // }

                    //перевіряємо щоб сервер повернув JSON з інформацією про помилку
                    var errorsObj,
                        contentType = response.headers.get("content-type");
                    if(contentType && contentType.indexOf("application/json") !== -1 && (errorsObj = response.json().errors instanceof Object)) {
                        return reject(errorsObj);
                    } else {
                        throw(new Error("Отримано некоректну відповідь від сервера!"));
                    }
                } else if(response.status === 404) {
                    throw(new Error('Не знайдено відповідного методу на сервері!'));
                } else if( 499 < response.status && response.status < 600 ) {
                    throw(new Error(`Сталася помилка ${response.status} на сервері!`));
                } else {
                    // we're not sure what happened, but handle it:
                    // our Error will get passed straight to `.catch()`
                    throw(new Error('Сталася невідома помилка при пошуку посад!'));
                }
            })
            .catch( error => dispatch(submitFormFail(error)) );
    });
}



export function hideModalAddInfoFromAnotherOccup() {
    return {
        type: HIDE_MODAL_ADD_INFO_FROM_ANOTHER_OCCUP
    }
}

//data = {
// field
// }
export function showModalAddInfoFromAnotherOccup(data) {
    return {
        type: SHOW_MODAL_ADD_INFO_FROM_ANOTHER_OCCUP,
        data
    }
}
