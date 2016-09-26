import {
    ADD_NEW_OCCUP_SUBMIT_REQUEST,
    ADD_NEW_OCCUP_SUBMIT_FAIL,
    ADD_NEW_OCCUP_SUBMIT_SUCCESS,

    ADD_NEW_OCCUP_HIDE_SERVER_RESP_MSG,

    ADD_NEW_OCCUP_OCCUPATION_GROUP_INP_CHANGE,
    ADD_NEW_OCCUP_CLARIFICATION_INP_CHANGE,
    ADD_NEW_OCCUP_CLARIFIED_OCCUP_INP_CHANGE,
    ADD_NEW_OCCUP_INP_IS_VIRTUAL_CHANGE
} from '../constants/addNewOccup'

import { ADD_OCCUPATION as API_ADD_OCCUPATION} from '../constants/API_URIs';


function submitFormRequest (data) {
    return {
        type: ADD_NEW_OCCUP_SUBMIT_REQUEST,
        data
    }
}

function submitFormSuccess (response) {
    return {
        type: ADD_NEW_OCCUP_SUBMIT_SUCCESS,
        response
    }
}

function submitFormFail (error) {
    return {
        type: ADD_NEW_OCCUP_SUBMIT_FAIL,
        error
    }
}

export function submitFormAddNewOccup(data, dispatch) {
    dispatch(submitFormRequest(data));

    //тут проміс треба для redux-form
    return new Promise((resolve, reject) => {
        return fetch(
            API_ADD_OCCUPATION,
            {
                credentials: 'include',
                mode: 'cors',
                method: 'post',
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
                    throw(new Error("Передано некоректні дані на сервер!"));
                    /*
                     //перевіряємо щоб сервер поверув JSON з інформацією про помилку
                     var errorsObj,
                     contentType = response.headers.get("content-type");
                     if(contentType && contentType.indexOf("application/json") !== -1 && (errorsObj = response.json().errors instanceof Object)) {
                     return reject(errorsObj);
                     } else {
                     throw(new Error("Отримано некоректну відповідь від сервера!"));
                     }
                     */
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
                dispatch(submitFormFail(error));
                reject({ _error: error.message || error });
            });
    });
}


export function addNewOccupHideServerRespMsg() {
    return {
        type: ADD_NEW_OCCUP_HIDE_SERVER_RESP_MSG
    }
}


export function occupationGroupInpChange(newVal) {
    return {
        type: ADD_NEW_OCCUP_OCCUPATION_GROUP_INP_CHANGE,
        newVal
    }
}

export function clarificationInpChange(newVal) {
    return {
        type: ADD_NEW_OCCUP_CLARIFICATION_INP_CHANGE,
        newVal
    }
}

export function clarifiedOccupInpChange(newVal) {
    return {
        type: ADD_NEW_OCCUP_CLARIFIED_OCCUP_INP_CHANGE,
        newVal
    }
}

export function inpIsVirtualChange(newVal) {
    return {
        type: ADD_NEW_OCCUP_INP_IS_VIRTUAL_CHANGE,
        newVal
    }
}