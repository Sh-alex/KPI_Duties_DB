import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,

    LOGOUT_SUCCESS,

    GET_USER_INFO_REQUEST,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_FAIL,

    CLEAR_LOG_IN_ERROR,

    DENY_ACCESS_TO_THE_USER
} from '../constants/user'

import {
    LOGIN_USER as URI_LOGIN_USER,
    GET_USER_INFO_BY_TOKEN as URI_GET_USER_INFO_BY_TOKEN
} from "../constants/API_URIs"

import { push as historyPushStateAction, replace, go } from 'react-router-redux'


function loginUserRequest (data) {
    return {
        type: LOGIN_REQUEST,
        data
    }
}

function loginUserSuccess (response) {
    return {
        type: LOGIN_SUCCESS,
        response
    }
}

function loginUserFail (errorMsg) {
    return {
        type: LOGIN_FAIL,
        errorMsg
    }
}

/**
 * @param {Object} authData - дані авторизації користувача
 * @param {String} authData.login - логін
 * @param {String} authData.pass - пароль
 * @param {Function} dispatch - функція dispatch
 */
export function logInUser(authData, dispatch) {
    //дописуємо, бо так вимагає сервер
    Object.assign(authData, {
        "grant_type": "password",
        "client_id": "web_app",
        "client_secret" : "secret"
    });

    dispatch( loginUserRequest(authData) );

    //тут проміс треба для redux-form
    return new Promise((resolve, reject) => {
        return fetch(
            URI_LOGIN_USER,
            {
                credentials: 'include',
                mode: 'cors',
                method: 'post',
                body: JSON.stringify(authData),
                headers: {
                    'Content-Type': 'application/json',
                    //'X-CSRFToken': CSRF_TOKEN
                }
            })
            .then( response => {
                if(response.status === 404)
                    throw 'При авторизації користувача не знайдено відповідного методу на сервері!';
                if(response.status === 400)
                    throw 'При авторизації користувача передано некоректні дані на сервері!';
                if(response.status === 401)
                    throw 'Не знайдено користувача із таким логіном і паролем!';
                if( 499 < response.status && response.status < 600 )
                    throw `При авторизації користувача сталася помилка ${response.status} на сервері!`;

                var contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json();
                }
                throw 'Сталася невідома помилка при авторизації користувача!';
            })
            .then( json => {
                if(!json || !json.access_token || !json.expires_in)
                    throw "При авторизації отримано некоректні дані від сервера!";

                //store JWT Token to browser localStorage
                localStorage.jwtToken = json.access_token;

                setTimeout(() => {
                    //якщо додаток не закриється до того як термін дії токена витіче, кажемо що термін дії ключа авторизації витік, треба авторизуватися знову
                    //alert("Термін дії ключа авторизації витік, необхідна повторна авторизація");
                    //logOutUser();

                    logInUser(authData, dispatch);
                }, json.expires_in * 1000); //json.expires_in у секундах, а таймер у мс

                dispatch(loginUserSuccess(json));
                //отримуємо дані про користувача по цьому токену
                dispatch(getUserInfo(json.access_token));
                resolve(json);
            })
            .catch( error => {
                if(error && error.message === "Failed to fetch")
                    error = `Сталася неочікувана помилка при авторизації користувача! Перевірте роботу мережі.`;
                if(!error || !(typeof error == "string"))
                    error = 'Сталася невідома помилка при авторизації користувача!';

                localStorage.removeItem('jwtToken');

                dispatch(loginUserFail(error));
                reject({ _error: error });
            });
    });
}



export function logOutUser() {
    return function (dispatch) {
        localStorage.removeItem('jwtToken');
        dispatch(historyPushStateAction("/"));
        dispatch({ type: LOGOUT_SUCCESS });
    }
}





function getUserInfoRequest (data) {
    return {
        type: GET_USER_INFO_REQUEST,
        data
    }
}

function getUserInfoSuccess (response) {
    return {
        type: GET_USER_INFO_SUCCESS,
        response
    }
}

function getUserInfoFail (errorMsg) {
    return {
        type: GET_USER_INFO_FAIL,
        errorMsg
    }
}

export function getUserInfo(access_token = localStorage.jwtToken) {
    return function (dispatch) {
        if(!access_token || access_token === '') { //if there is no token, dont bother
            return console.log("called getUserInfo with empty argument 'access_token'");
        }

        dispatch( getUserInfoRequest(access_token) );

        return fetch(
            URI_GET_USER_INFO_BY_TOKEN,
            {
                credentials: 'include',
                mode: 'cors',
                method: 'get',
                //body: JSON.stringify({access_token}),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': 'Bearer ' + access_token
                    //'X-CSRFToken': CSRF_TOKEN
                }
            })
            .then( response => {
                if(response.status === 404)
                    throw 'При отриманні інформації про користувача не знайдено відповідного методу на сервері!';
                if(response.status === 400)
                    throw 'При отриманні інформації про користувача передано некоректні дані на сервері!';
                if(response.status === 401) {
                    localStorage.removeItem('jwtToken');
                    throw 'Термін дії ключа авторизації витік, необхідна повторна авторизація.';
                }
                if( 499 < response.status && response.status < 600 )
                    throw `При отриманні інформації про користувача сталася помилка ${response.status} на сервері!`;

                var contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json();
                }
                throw 'Сталася невідома помилка при отриманні інформації про користувача!';
            })
            .then( json => {
                if(!json || !json.Surname || !json.Name)
                    throw "При запиті інформації про користувача отримано некоректні дані від сервера!";

                let resUserData = {
                    "userName": `${json.Name} ${json.Surname}`,
                    "userAvatar": json.img && "data:image/png;base64,"+json.img || "",
                    permissions: {
                        "accessName": json.permissions.accessName || "Доступ заборонено",
                        "forms": json.permissions || {}
                    },
                // {    Example:
                //         "accessName": "Перегляд, редагування, вставка",
                //         "forms": {
                //             "addNewOccupations": {
                //                 "show": true,
                //                 "parts": {}
                //             },
                //             "delOccupations": {
                //                 "show": false,
                //                 "parts": {}
                //             },
                //             "editOccupations": {
                //                 "show": true,
                //                 "parts": {}
                //             },
                //             "searchOccupations": {
                //                 "show": true,
                //                 "parts": {}
                //             },
                //             "downloadSearchResults": {
                //                 "show": true,
                //                 "parts": {}
                //             },
                //             "addInfoFromAnotherOccupations": {
                //                 "show": false,
                //                 "parts": {}
                //             },
                //             "ctrlDc": {
                //                 "show": true,
                //                 "parts": {
                //                     "addNewValues": true,
                //                     "delValues": true,
                //                     "editValues": true,
                //                     "showUsingOccupations": true
                //                 }
                //             }
                //         }
                //     }
                };
                dispatch(getUserInfoSuccess(resUserData));
            })
            .catch( error => {
                if(location.pathname !== "\/")
                    dispatch(historyPushStateAction("/"));

                if(error && error.message === "Failed to fetch")
                    error = `Сталася неочікувана помилка при отриманні інформації про користувача! Перевірте роботу мережі.`;
                else if(!error || !(typeof error == "string"))
                    error = `Сталася неочікувана помилка при отриманні інформації про користувача`;
                dispatch(getUserInfoFail(error));
            });
    }
}

export function clearLogInError() {
    return {
        type: CLEAR_LOG_IN_ERROR
    }
}



export function denyAccessToTheUser() {
    return{
        type: DENY_ACCESS_TO_THE_USER
    };
}

export function denyAccessToTheUserWithRedirect() {
    return function (dispatch) {
        dispatch(denyAccessToTheUser());
        dispatch(historyPushStateAction("/"));
    }
}
