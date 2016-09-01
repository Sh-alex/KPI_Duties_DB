import {
    ADD_FORM_SUBMIT_REQUEST,
    ADD_FORM_SUBMIT_FAIL,
    ADD_FORM_SUBMIT_SUCCESS,
    HIDE_ADD_FORM_SERVER_RESP_MSG,
    ADD_FORM_OCCUPATION_GROUP_INP_CHANGE,
    ADD_FORM_CLARIFICATION_INP_CHANGE,
    ADD_FORM_CLARIFIED_OCCUP_INP_CHANGE
} from '../constants/AddOccupBox'

import * as API_URIs from '../constants/API_URIs';

function postToApi(data) {
    return fetch( API_URIs.ADD_OCCUPATION, {
        credentials: 'include',
        mode: 'cors',
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            //'X-CSRFToken': CSRF_TOKEN
        }
    });
}

function submitAddFormRequest (data) {
    return {
        type: ADD_FORM_SUBMIT_REQUEST,
        data
    }
}

function submitAddFormSuccess (response) {
    return {
        type: ADD_FORM_SUBMIT_SUCCESS,
        response
    }
}

function submitAddFormFail (error) {
    return {
        type: ADD_FORM_SUBMIT_FAIL,
        error
    }
}

export function submitAddForm(data, dispatch) {
    dispatch(submitAddFormRequest(data));

    //тут проміс треба для redux-form
    return new Promise((resolve, reject) => {
        postToApi(data)
            .then((response) => {
                if (response.status === 200) {
                    dispatch(submitAddFormSuccess(response));
                    resolve();
                }
                else if (response.status === 400) {
                    // here I expect that the server will return the shape:
                    // {
                    //   field1: 'error text',
                    //   field2: 'error text',
                    //   _error: 'Overall error text'
                    // }

                    //перевіряємо щоб сервер поверув JSON з інформацією про помилку
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
                    throw(new Error('Сталася невідома помилка при додаванні посади!'));
                }
            })
            .catch( (error = 'Сталася невідома помилка при додаванні посади!') => {
                dispatch(submitAddFormFail(error));
                reject({ _error: error.message || error });
            });
    });
}



export function hideAddFormServerRespMsg() {
    return {
        type: HIDE_ADD_FORM_SERVER_RESP_MSG
    }
}


export function occupationGroupInpChange(newVal) {
    return {
        type: ADD_FORM_OCCUPATION_GROUP_INP_CHANGE,
        newVal
    }
}

export function clarificationInpChange(newVal) {
    return {
        type: ADD_FORM_CLARIFICATION_INP_CHANGE,
        newVal
    }
}

export function clarifiedOccupInpChange(newVal) {
    return {
        type: ADD_FORM_CLARIFIED_OCCUP_INP_CHANGE,
        newVal
    }
}