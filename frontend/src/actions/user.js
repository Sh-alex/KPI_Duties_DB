import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,

    LOGOUT_SUCCESS,

    GET_USER_INFO_REQUEST,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_FAIL,

    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAIL,

    CLEAR_LOG_IN_ERROR
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
 */
export function logInUser(authData, dispatch) {
    authData.grant_type = "password";   //дописуємо, бо так вимагає сервер
    dispatch( loginUserRequest(authData) );

    localStorage.removeItem('refresh_token');

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
                if(!json || !json.access_token || !json.refresh_token || !json.expires_in)
                    throw "При авторизації отримано некоректні дані про користувача від сервера!";

                //store JWT Token to browser localStorage
                localStorage.refresh_token = json.refresh_token;

                //якщо додаток не закриється до того як термін дії токена витіче, оновлюємо токен
                setTimeout(refreshAccessToken, json.expires_in);

                dispatch(loginUserSuccess(json));
                //отримуємо дані про користувача по цьому токену
                dispatch(getUserInfo(json.access_token));
                resolve(json);
            })
            .catch( error => {
                if(!error || !(typeof error == "string"))
                    error = 'Сталася невідома помилка при авторизації користувача!';
                dispatch(loginUserFail(error));
                reject({ _error: error.message || error });
            });
    });
}



export function logOutUser() {
    return function (dispatch) {
        localStorage.removeItem('refresh_token');
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

export function getUserInfo(access_token) {
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
                method: 'post',
                body: JSON.stringify({access_token}),
                headers: {
                    'Content-Type': 'application/json',
                    //'X-CSRFToken': CSRF_TOKEN
                }
            })
            .then( response => {
                if(response.status === 404)
                    throw 'При отриманні інформації про користувача не знайдено відповідного методу на сервері!';
                if(response.status === 400)
                    throw 'При отриманні інформації про користувача передано некоректні дані на сервері!';
                if(response.status === 401)
                    throw 'Не вдалося отримати інформацію про авторизованого користувача!';
                if( 499 < response.status && response.status < 600 )
                    throw `При отриманні інформації про користувача сталася помилка ${response.status} на сервері!`;

                var contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json();
                }
                throw 'Сталася невідома помилка при отриманні інформації про користувача!';
            })
            .then( json => {
                if(!json || !json.userName /* || !json.smthElse */)
                    throw "При запиті інформації про користувача отримано некоректні дані від сервера!";

                dispatch(getUserInfoSuccess(json));
            })
            .catch( error => {
                if(!error || !(typeof error == "string"))
                    error = 'Сталася невідома помилка при отриманні інформації про користувача!';
                dispatch(getUserInfoFail(error));
            });
    }
}

export function clearLogInError() {
    return {
        type: CLEAR_LOG_IN_ERROR
    }
}



function refreshAccessTokenRequest (data) {
    return {
        type: REFRESH_TOKEN_REQUEST,
        data
    }
}

function refreshAccessTokenSuccess (response) {
    return {
        type: REFRESH_TOKEN_SUCCESS,
        response
    }
}

function refreshAccessTokenFail (errorMsg) {
    return {
        type: REFRESH_TOKEN_FAIL,
        errorMsg
    }
}

export function refreshAccessToken(dispatch) {
    return new Promise((resolve, reject) => {
        let refresh_token = localStorage.refresh_token;
        if(!refresh_token) {
            console.log("Called refreshAccessToken, but refresh_token is empty");
            return resolve(null);
        }

        let data = {
            grant_type: "refresh_token",
            refresh_token
        };

        dispatch( refreshAccessTokenRequest(data) );

        return fetch(
            URI_LOGIN_USER,
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
            .then( response => {
                if(response.status === 404)
                    throw 'При оновленні токена доступу не знайдено відповідного методу на сервері!';
                if(response.status === 400)
                    throw 'Не знайдено підходящого токена доступу';
                if( 499 < response.status && response.status < 600 )
                    throw `При оновленні токена доступу сталася помилка ${response.status} на сервері!`;

                var contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json();
                }
                throw 'Сталася невідома помилка при оновленні токена доступу!';
            })
            .then( json => {
                if(!json || !json.access_token || !json.refresh_token || !json.expires_in)
                    throw "При оновленні токена доступу отримано некоректні дані від сервера!";

                //store JWT Token to browser localStorage
                localStorage.refresh_token = json.refresh_token;

                //якщо додаток не закриється до того як термін дії токена витіче, оновлюємо токен
                setTimeout(refreshAccessToken, json.expires_in);

                dispatch(refreshAccessTokenSuccess(json));
                resolve(json);
            })
            .catch( error => {
                if(!error || !(typeof error == "string"))
                    error = 'Сталася невідома помилка при оновленні токена доступу!';
                dispatch(refreshAccessTokenFail(error));
                reject({ _error: error.message || error });
            });
    });
}

export function refreshTokenAndGetUserInfo() {
    return function (dispatch) {
        return refreshAccessToken(dispatch)
            .then( (response) => {
                response && response.access_token && getUserInfo(response.access_token);
            })
            .catch(err => console.error("caughtError in refreshTokenAndGetUserInfo: ", err));
    }
}