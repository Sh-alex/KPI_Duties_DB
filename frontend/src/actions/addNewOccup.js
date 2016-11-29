import {
    ADD_NEW_OCCUP_SUBMIT_REQUEST,
    ADD_NEW_OCCUP_SUBMIT_FAIL,
    ADD_NEW_OCCUP_SUBMIT_SUCCESS,

    ADD_NEW_OCCUP_HIDE_SERVER_RESP_MSG,

    ADD_NEW_OCCUP_OCCUPATION_GROUP_INP_CHANGE,
    ADD_NEW_OCCUP_CLARIFICATION_INP_CHANGE,
    ADD_NEW_OCCUP_CLARIFIED_OCCUP_INP_CHANGE,
    ADD_NEW_OCCUP_KP_CODE_INP_CHANGE,
    ADD_NEW_OCCUP_DKHP_CODE_INP_CHANGE,
    ADD_NEW_OCCUP_ZKPPTR_CODE_INP_CHANGE,
    ADD_NEW_OCCUP_ETDK_CODE_INP_CHANGE,
    ADD_NEW_OCCUP_INP_IS_VIRTUAL_CHANGE,
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
        let access_token = localStorage.jwtToken;

        return fetch(
            API_ADD_OCCUPATION,
            {
                credentials: 'include',
                mode: 'cors',
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': access_token ? 'Bearer ' + access_token : ""
                    //'X-CSRFToken': CSRF_TOKEN
                }
            })
            .then((response) => {
                if (response.ok) {
                    dispatch(submitFormSuccess(response));
                    resolve();
                } else if (response.status === 400)
                    throw "Передано некоректні дані на сервер!";
                    /*
                     //перевіряємо щоб сервер поверув JSON з інформацією про помилку
                     var errorsObj,
                     contentType = response.headers.get("content-type");
                     if(contentType && contentType.indexOf("application/json") !== -1 && (errorsObj = response.json().errors instanceof Object)) {
                     return reject(errorsObj);
                     } else {
                     throw "Отримано некоректну відповідь від сервера!";
                     }
                     */
                else if(response.status === 404)
                    throw 'Не знайдено відповідного методу на сервері!';
                else if( 499 < response.status && response.status < 600 )
                    throw `Сталася помилка ${response.status} на сервері!`;
                else
                    throw 'Сталася невідома помилка при додаванні посади!';
            })
            .catch( error => {
                if(error && error.message === "Failed to fetch")
                    error = `Сталася невідома помилка при додаванні посади! Перевірте роботу мережі.`;
                else if(!error || !(typeof error == "string"))
                    error = `Сталася невідома помилка при додаванні посади`;

                dispatch(submitFormFail(error));
                reject({ _error: error });
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


export function KPCodeInpChange(newVal, resPortionIndex) {
    return {
        type: ADD_NEW_OCCUP_KP_CODE_INP_CHANGE,
        newVal,
        resPortionIndex
    }
}

export function DKHPCodeInpChange(newVal, resPortionIndex) {
    return {
        type: ADD_NEW_OCCUP_DKHP_CODE_INP_CHANGE,
        newVal,
        resPortionIndex
    }
}

export function ZKPPTRCodeInpChange(newVal, resPortionIndex) {
    return {
        type: ADD_NEW_OCCUP_ZKPPTR_CODE_INP_CHANGE,
        newVal,
        resPortionIndex
    }
}

export function ETDKCodeInpChange(newVal, resPortionIndex) {
    return {
        type: ADD_NEW_OCCUP_ETDK_CODE_INP_CHANGE,
        newVal,
        resPortionIndex
    }
}
