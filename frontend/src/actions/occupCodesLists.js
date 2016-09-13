import {
    FETCH_KP_CODES_LIST_REQUEST,
    FETCH_KP_CODES_LIST_FAIL,
    FETCH_KP_CODES_LIST_SUCCESS,

    FETCH_ZKPPTR_CODES_LIST_REQUEST,
    FETCH_ZKPPTR_CODES_LIST_FAIL,
    FETCH_ZKPPTR_CODES_LIST_SUCCESS,

    FETCH_ETDK_CODES_LIST_REQUEST,
    FETCH_ETDK_CODES_LIST_FAIL,
    FETCH_ETDK_CODES_LIST_SUCCESS,

    FETCH_DKHP_CODES_LIST_REQUEST,
    FETCH_DKHP_CODES_LIST_FAIL,
    FETCH_DKHP_CODES_LIST_SUCCESS,

    ADD_NEW_KP_CODE_REQUEST,
    ADD_NEW_KP_CODE_SUCCESS,
    ADD_NEW_KP_CODE_FAIL,
    ADD_NEW_KP_CODE_CLEAR_ERROR,

    ADD_NEW_ZKPPTR_CODE_REQUEST,
    ADD_NEW_ZKPPTR_CODE_SUCCESS,
    ADD_NEW_ZKPPTR_CODE_FAIL,
    ADD_NEW_ZKPPTR_CODE_CLEAR_ERROR,

    ADD_NEW_ETDK_CODE_REQUEST,
    ADD_NEW_ETDK_CODE_SUCCESS,
    ADD_NEW_ETDK_CODE_FAIL,
    ADD_NEW_ETDK_CODE_CLEAR_ERROR,

    ADD_NEW_DKHP_CODE_REQUEST,
    ADD_NEW_DKHP_CODE_SUCCESS,
    ADD_NEW_DKHP_CODE_FAIL,
    ADD_NEW_DKHP_CODE_CLEAR_ERROR,
} from '../constants/occupCodesLists'

import * as API_URIs from '../constants/API_URIs';

export function fetchKPCodesList() {
    return function (dispatch) {
        dispatch({
            type: FETCH_KP_CODES_LIST_REQUEST
        });

        return fetch(API_URIs.FETCH_KP_CODES_LIST)
            .then( response => {
                if(response.status === 404)
                    throw 'При отриманні списку Коди КП не знайдено відповідного методу на сервері!';
                if( 499 < response.status && response.status < 600 )
                    throw `При отриманні списку Коди КП сталася помилка ${response.status} на сервері!`;

                var contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json()
                } else {
                    return Promise.reject("Отримано некоректні дані для списку Коди КП");
                }
            })
            .then( data => {
                if (!(data instanceof Array) && !(data.idNameResponses instanceof Array))
                    return Promise.reject("Отримано некоректні дані для списку Коди КП");
                if (data && data.idNameResponses)
                    data = data.idNameResponses;
                dispatch({
                    type: FETCH_KP_CODES_LIST_SUCCESS,
                    data
                })
            })
            .catch( error => dispatch({
                type: FETCH_KP_CODES_LIST_FAIL,
                error
            }))
    }
}

export function fetchZKPPTRCodesList() {
    return function (dispatch) {
        dispatch({
            type: FETCH_ZKPPTR_CODES_LIST_REQUEST
        });

        return fetch(API_URIs.FETCH_ZKPPTR_CODES_LIST)
            .then( response => {
                if(response.status === 404)
                    throw 'При отриманні списку Коди ЗКППТР не знайдено відповідного методу на сервері!';
                if( 499 < response.status && response.status < 600 )
                    throw `При отриманні списку Коди ЗКППТР сталася помилка ${response.status} на сервері!`;

                var contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json()
                } else {
                    return Promise.reject("Отримано некоректні дані для списку Коди ЗКППТР");
                }
            })
            .then( data => {
                if( !(data instanceof Array) && !(data.idNameResponses instanceof Array))
                    return Promise.reject("Отримано некоректні дані для списку Коди ЗКППТР");
                if(data && data.idNameResponses)
                    data = data.idNameResponses;
                dispatch({
                    type: FETCH_ZKPPTR_CODES_LIST_SUCCESS,
                    data
                })
            })
            .catch( error => dispatch({
                type: FETCH_ZKPPTR_CODES_LIST_FAIL,
                error
            }))
    }
}

export function fetchETDKCodesList() {
    return function (dispatch) {
        dispatch({
            type: FETCH_ETDK_CODES_LIST_REQUEST
        });

        return fetch(API_URIs.FETCH_ETDK_CODES_LIST)
            .then( response => {
                if(response.status === 404)
                    throw 'При отриманні списку Коди ЄТДК не знайдено відповідного методу на сервері!';
                if( 499 < response.status && response.status < 600 )
                    throw `При отриманні списку Коди ЄТДК сталася помилка ${response.status} на сервері!`;

                var contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json()
                } else {
                    return Promise.reject("Отримано некоректні дані для списку Коди ЄТДК");
                }
            })
            .then( data => {
                if (!(data instanceof Array) && !(data.idNameResponses instanceof Array))
                    return Promise.reject("Отримано некоректні дані для списку Коди ЄТДК");
                if (data && data.idNameResponses)
                    data = data.idNameResponses;
                dispatch({
                    type: FETCH_ETDK_CODES_LIST_SUCCESS,
                    data
                });
            })
            .catch( error => dispatch({
                type: FETCH_ETDK_CODES_LIST_FAIL,
                error
            }))
    }
}

export function fetchDKHPCodesList() {
    return function (dispatch) {
        dispatch({
            type: FETCH_DKHP_CODES_LIST_REQUEST
        });

        return fetch(API_URIs.FETCH_DKHP_CODES_LIST)
            .then( response => {
                if(response.status === 404)
                    throw 'При отриманні списку Коди ДКХП не знайдено відповідного методу на сервері!';
                if( 499 < response.status && response.status < 600 )
                    throw `При отриманні списку Коди ДКХП сталася помилка ${response.status} на сервері!`;

                var contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json()
                } else {
                    return Promise.reject("Отримано некоректні дані для списку Коди ДКХП");
                }
            })
            .then( data => {
                if (!(data instanceof Array) && !(data.idNameResponses instanceof Array))
                    return Promise.reject("Отримано некоректні дані для списку Коди ДКХП");
                if (data && data.idNameResponses)
                    data = data.idNameResponses;
                dispatch({
                    type: FETCH_DKHP_CODES_LIST_SUCCESS,
                    data
                })
            })
            .catch( error => dispatch({
                type: FETCH_DKHP_CODES_LIST_FAIL,
                error
            }))
    }
}


export function addNewKPCode(newVal) {
    return function (dispatch) {
        dispatch({
            type: ADD_NEW_KP_CODE_REQUEST,
            newVal
        });

        return fetch(API_URIs.ADD_NEW_KP_CODE, {
            credentials: 'include',
            mode: 'cors',
            method: 'post',
            body: JSON.stringify({newVal}),
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': CSRF_TOKEN
            }
        })
            .then(response => {
                if (response.status === 404)
                    throw 'При додаванні нового значення не знайдено відповідного методу на сервері!';
                if (499 < response.status && response.status < 600)
                    throw `При додаванні нового значення сталася помилка ${response.status} на сервері!`;

                var contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json();
                }
                throw "При додаванні нового значення не отримано ідентифікатор нового запису від сервера!";
            })
            .then(json => {
                let createdId = json.id,
                    error = json.error;
                if (createdId == undefined)
                    throw "При додаванні нового значення не отримано ідентифікатор нового запису від сервера!";
                if (error)
                    throw error;

                let resObj = {
                    "id": createdId,
                    "textValue": newVal
                };
                dispatch({
                    type: ADD_NEW_KP_CODE_SUCCESS,
                    newItem: resObj
                });
                //dispatch(KPCOdesInpChange(resObj));
            })
            .catch(error => dispatch({
                type: ADD_NEW_KP_CODE_FAIL,
                error: error || "Сталася неочікувана помилка при додаванні нового значення!"
            }))
    }
}


export function addNewETDKCode(newVal) {
    return function (dispatch) {
        dispatch({
            type: ADD_NEW_ETDK_CODE_REQUEST,
            newVal
        });

        return fetch(API_URIs.ADD_NEW_ETDK_CODE, {
            credentials: 'include',
            mode: 'cors',
            method: 'post',
            body: JSON.stringify({newVal}),
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': CSRF_TOKEN
            }
        })
            .then(response => {
                if (response.status === 404)
                    throw 'При додаванні нового значення не знайдено відповідного методу на сервері!';
                if (499 < response.status && response.status < 600)
                    throw `При додаванні нового значення сталася помилка ${response.status} на сервері!`;

                var contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json();
                }
                throw "При додаванні нового значення не отримано ідентифікатор нового запису від сервера!";
            })
            .then(json => {
                let createdId = json.id,
                    error = json.error;
                if (createdId == undefined)
                    throw "При додаванні нового значення не отримано ідентифікатор нового запису від сервера!";
                if (error)
                    throw error;

                let resObj = {
                    "id": createdId,
                    "textValue": newVal
                };
                dispatch({
                    type: ADD_NEW_ETDK_CODE_SUCCESS,
                    newItem: resObj
                });
                //dispatch(ETDKCOdesInpChange(resObj));
            })
            .catch(error => dispatch({
                type: ADD_NEW_ETDK_CODE_FAIL,
                error: error || "Сталася неочікувана помилка при додаванні нового значення!"
            }))
    }
}


export function addNewDKHPCode(newVal) {
    return function (dispatch) {
        dispatch({
            type: ADD_NEW_DKHP_CODE_REQUEST,
            newVal
        });

        return fetch(API_URIs.ADD_NEW_DKHP_CODE, {
            credentials: 'include',
            mode: 'cors',
            method: 'post',
            body: JSON.stringify({newVal}),
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': CSRF_TOKEN
            }
        })
            .then(response => {
                if (response.status === 404)
                    throw 'При додаванні нового значення не знайдено відповідного методу на сервері!';
                if (499 < response.status && response.status < 600)
                    throw `При додаванні нового значення сталася помилка ${response.status} на сервері!`;

                var contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json();
                }
                throw "При додаванні нового значення не отримано ідентифікатор нового запису від сервера!";
            })
            .then(json => {
                let createdId = json.id,
                    error = json.error;
                if (createdId == undefined)
                    throw "При додаванні нового значення не отримано ідентифікатор нового запису від сервера!";
                if (error)
                    throw error;

                let resObj = {
                    "id": createdId,
                    "textValue": newVal
                };
                dispatch({
                    type: ADD_NEW_DKHP_CODE_SUCCESS,
                    newItem: resObj
                });
                //dispatch(DKHPCOdesInpChange(resObj));
            })
            .catch(error => dispatch({
                type: ADD_NEW_DKHP_CODE_FAIL,
                error: error || "Сталася неочікувана помилка при додаванні нового значення!"
            }))
    }
}

export function addNewZKPPTRCode(newVal) {
    return function (dispatch) {
        dispatch({
            type: ADD_NEW_ZKPPTR_CODE_REQUEST,
            newVal
        });

        return fetch(API_URIs.ADD_NEW_ZKPPTR_CODE, {
            credentials: 'include',
            mode: 'cors',
            method: 'post',
            body: JSON.stringify({newVal}),
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': CSRF_TOKEN
            }
        })
            .then(response => {
                if (response.status === 404)
                    throw 'При додаванні нового значення не знайдено відповідного методу на сервері!';
                if (499 < response.status && response.status < 600)
                    throw `При додаванні нового значення сталася помилка ${response.status} на сервері!`;

                var contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json();
                }
                throw "При додаванні нового значення не отримано ідентифікатор нового запису від сервера!";
            })
            .then(json => {
                let createdId = json.id,
                    error = json.error;
                if (createdId == undefined)
                    throw "При додаванні нового значення не отримано ідентифікатор нового запису від сервера!";
                if (error)
                    throw error;

                let resObj = {
                    "id": createdId,
                    "textValue": newVal
                };
                dispatch({
                    type: ADD_NEW_ZKPPTR_CODE_SUCCESS,
                    newItem: resObj
                });
                //dispatch(ZKPPTRCOdesInpChange(resObj));
            })
            .catch(error => dispatch({
                type: ADD_NEW_ZKPPTR_CODE_FAIL,
                error: error || "Сталася неочікувана помилка при додаванні нового значення!"
            }))
    }
}


export function clearKPCodeAddingError() {
    return {
        type: ADD_NEW_KP_CODE_CLEAR_ERROR
    }
}

export function clearDKHPCodeAddingError() {
    return {
        type: ADD_NEW_DKHP_CODE_CLEAR_ERROR
    }
}

export function clearETDKCodeAddingError() {
    return {
        type: ADD_NEW_ETDK_CODE_CLEAR_ERROR
    }
}

export function clearZKPPTRCodeAddingError() {
    return {
        type: ADD_NEW_ZKPPTR_CODE_CLEAR_ERROR
    }
}