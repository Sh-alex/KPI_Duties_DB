import {
    FETCH_HAVE_TO_KNOW_TEXTS_LIST_REQUEST,
    FETCH_HAVE_TO_KNOW_TEXTS_LIST_FAIL,
    FETCH_HAVE_TO_KNOW_TEXTS_LIST_SUCCESS,

    FETCH_RESPONSIBILITIES_TEXTS_LIST_REQUEST,
    FETCH_RESPONSIBILITIES_TEXTS_LIST_FAIL,
    FETCH_RESPONSIBILITIES_TEXTS_LIST_SUCCESS,

    FETCH_QUALIFF_REQUIR_TEXTS_LIST_REQUEST,
    FETCH_QUALIFF_REQUIR_TEXTS_LIST_FAIL,
    FETCH_QUALIFF_REQUIR_TEXTS_LIST_SUCCESS,

    ADD_NEW_HAVE_TO_KNOW_TEXT_REQUEST,
    ADD_NEW_HAVE_TO_KNOW_TEXT_SUCCESS,
    ADD_NEW_HAVE_TO_KNOW_TEXT_FAIL,
    ADD_NEW_HAVE_TO_KNOW_TEXT_CLEAR_MSG,

    ADD_NEW_RESPONSIBILITIES_TEXT_REQUEST,
    ADD_NEW_RESPONSIBILITIES_TEXT_SUCCESS,
    ADD_NEW_RESPONSIBILITIES_TEXT_FAIL,
    ADD_NEW_RESPONSIBILITIES_TEXT_CLEAR_MSG,

    ADD_NEW_QUALIFF_REQUIR_TEXT_REQUEST,
    ADD_NEW_QUALIFF_REQUIR_TEXT_SUCCESS,
    ADD_NEW_QUALIFF_REQUIR_TEXT_FAIL,
    ADD_NEW_QUALIFF_REQUIR_TEXT_CLEAR_MSG,

    EDIT_HAVE_TO_KNOW_TEXT_REQUEST,
    EDIT_HAVE_TO_KNOW_TEXT_SUCCESS,
    EDIT_HAVE_TO_KNOW_TEXT_FAIL,
    EDIT_HAVE_TO_KNOW_TEXT_CLEAR_MSG,

    EDIT_RESPONSIBILITIES_TEXT_REQUEST,
    EDIT_RESPONSIBILITIES_TEXT_SUCCESS,
    EDIT_RESPONSIBILITIES_TEXT_FAIL,
    EDIT_RESPONSIBILITIES_TEXT_CLEAR_MSG,

    EDIT_QUALIFF_REQUIR_TEXT_REQUEST,
    EDIT_QUALIFF_REQUIR_TEXT_SUCCESS,
    EDIT_QUALIFF_REQUIR_TEXT_FAIL,
    EDIT_QUALIFF_REQUIR_TEXT_CLEAR_MSG,
} from '../constants/occupDescriptionTextsLists'

import {
    FETCH_HAVE_TO_KNOW_TEXTS_LIST as API_FETCH_HAVE_TO_KNOW_TEXTS_LIST,
    FETCH_RESPONSIBILITIES_TEXTS_LIST as API_FETCH_RESPONSIBILITIES_TEXTS_LIST,
    FETCH_QUALIFF_REQUIR_TEXTS_LIST as API_FETCH_QUALIFF_REQUIR_TEXTS_LIST,

    ADD_NEW_HAVE_TO_KNOW_TEXT as API_ADD_NEW_HAVE_TO_KNOW_TEXT,
    ADD_NEW_RESPONSIBILITIES_TEXT as API_ADD_NEW_RESPONSIBILITIES_TEXT,
    ADD_NEW_QUALIFF_REQUIR_TEXT as API_ADD_NEW_QUALIFF_REQUIR_TEXT,

    EDIT_HAVE_TO_KNOW_TEXT as API_EDIT_HAVE_TO_KNOW_TEXT,
    EDIT_RESPONSIBILITIES_TEXT as API_EDIT_RESPONSIBILITIES_TEXT,
    EDIT_QUALIFF_REQUIR_TEXT as API_EDIT_QUALIFF_REQUIR_TEXT,
} from '../constants/API_URIs';

import generateEditingDcValRequestFunction from "../utils/generateEditingDcValRequestFunction"

export function fetchHaveToKnowTextsList() {
    return function (dispatch) {
        dispatch({
            type: FETCH_HAVE_TO_KNOW_TEXTS_LIST_REQUEST
        });

        return fetch(API_FETCH_HAVE_TO_KNOW_TEXTS_LIST)
            .then( response => {
                if(response.status === 404)
                    throw 'При отриманні списку Повинен знати не знайдено відповідного методу на сервері!';
                if( 499 < response.status && response.status < 600 )
                    throw `При отриманні списку Повинен знати сталася помилка ${response.status} на сервері!`;

                var contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json()
                } else {
                    return Promise.reject("Отримано некоректні дані для списку Повинен знати");
                }
            })
            .then( data => {
                if (!(data instanceof Array) && !(data.idNameResponses instanceof Array))
                    return Promise.reject("Отримано некоректні дані для списку Повинен знати");
                if (data && data.idNameResponses)
                    data = data.idNameResponses;
                dispatch({
                    type: FETCH_HAVE_TO_KNOW_TEXTS_LIST_SUCCESS,
                    data
                })
            })
            .catch( error => dispatch({
                type: FETCH_HAVE_TO_KNOW_TEXTS_LIST_FAIL,
                error
            }))
    }
}

export function fetchResponsibilitiesTextsList() {
    return function (dispatch) {
        dispatch({
            type: FETCH_RESPONSIBILITIES_TEXTS_LIST_REQUEST
        });

        return fetch(API_FETCH_RESPONSIBILITIES_TEXTS_LIST)
            .then( response => {
                if(response.status === 404)
                    throw 'При отриманні списку Завдання, обов\'язки та повноваження не знайдено відповідного методу на сервері!';
                if( 499 < response.status && response.status < 600 )
                    throw `При отриманні списку Завдання, обов\'язки та повноваження сталася помилка ${response.status} на сервері!`;

                var contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json()
                } else {
                    return Promise.reject("Отримано некоректні дані для списку Завдання, обов\'язки та повноваження");
                }
            })
            .then( data => {
                if( !(data instanceof Array) && !(data.idNameResponses instanceof Array))
                    return Promise.reject("Отримано некоректні дані для списку Завдання, обов\'язки та повноваження");
                if(data && data.idNameResponses)
                    data = data.idNameResponses;
                dispatch({
                    type: FETCH_RESPONSIBILITIES_TEXTS_LIST_SUCCESS,
                    data
                })
            })
            .catch( error => dispatch({
                type: FETCH_RESPONSIBILITIES_TEXTS_LIST_FAIL,
                error
            }))
    }
}

export function fetchQualiffRequirTextsList() {
    return function (dispatch) {
        dispatch({
            type: FETCH_QUALIFF_REQUIR_TEXTS_LIST_REQUEST
        });

        return fetch(API_FETCH_QUALIFF_REQUIR_TEXTS_LIST)
            .then( response => {
                if(response.status === 404)
                    throw 'При отриманні списку Кваліфікаційні вимоги не знайдено відповідного методу на сервері!';
                if( 499 < response.status && response.status < 600 )
                    throw `При отриманні списку Кваліфікаційні вимоги сталася помилка ${response.status} на сервері!`;

                var contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json()
                } else {
                    return Promise.reject("Отримано некоректні дані для списку Кваліфікаційні вимоги");
                }
            })
            .then( data => {
                if (!(data instanceof Array) && !(data.idNameResponses instanceof Array))
                    return Promise.reject("Отримано некоректні дані для списку Кваліфікаційні вимоги");
                if (data && data.idNameResponses)
                    data = data.idNameResponses;
                dispatch({
                    type: FETCH_QUALIFF_REQUIR_TEXTS_LIST_SUCCESS,
                    data
                });
            })
            .catch( error => dispatch({
                type: FETCH_QUALIFF_REQUIR_TEXTS_LIST_FAIL,
                error
            }))
    }
}


export function addNewHaveToKnowText(newVal) {
    return function (dispatch) {
        dispatch({
            type: ADD_NEW_HAVE_TO_KNOW_TEXT_REQUEST,
            newVal
        });

        return fetch(API_ADD_NEW_HAVE_TO_KNOW_TEXT, {
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
                    type: ADD_NEW_HAVE_TO_KNOW_TEXT_SUCCESS,
                    newItem: resObj
                });
            })
            .catch(error => dispatch({
                type: ADD_NEW_HAVE_TO_KNOW_TEXT_FAIL,
                error: error || "Сталася неочікувана помилка при додаванні нового значення!"
            }))
    }
}

export function addNewResponsibilitiesText(newVal) {
    return function (dispatch) {
        dispatch({
            type: ADD_NEW_RESPONSIBILITIES_TEXT_REQUEST,
            newVal
        });

        return fetch(API_ADD_NEW_RESPONSIBILITIES_TEXT, {
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
                    type: ADD_NEW_RESPONSIBILITIES_TEXT_SUCCESS,
                    newItem: resObj
                });
                //dispatch(ETDKCOdesInpChange(resObj));
            })
            .catch(error => dispatch({
                type: ADD_NEW_RESPONSIBILITIES_TEXT_FAIL,
                error: error || "Сталася неочікувана помилка при додаванні нового значення!"
            }))
    }
}

export function addNewQualiffRequirText(newVal) {
    return function (dispatch) {
        dispatch({
            type: ADD_NEW_QUALIFF_REQUIR_TEXT_REQUEST,
            newVal
        });

        return fetch(API_ADD_NEW_QUALIFF_REQUIR_TEXT, {
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
                    type: ADD_NEW_QUALIFF_REQUIR_TEXT_SUCCESS,
                    newItem: resObj
                });
                //dispatch(DKHPCOdesInpChange(resObj));
            })
            .catch(error => dispatch({
                type: ADD_NEW_QUALIFF_REQUIR_TEXT_FAIL,
                error: error || "Сталася неочікувана помилка при додаванні нового значення!"
            }))
    }
}


export function clearHaveToKnowTextAddingMsg() {
    return {
        type: ADD_NEW_HAVE_TO_KNOW_TEXT_CLEAR_MSG
    }
}

export function clearQualiffRequirTextAddingMsg() {
    return {
        type: ADD_NEW_QUALIFF_REQUIR_TEXT_CLEAR_MSG
    }
}

export function clearResponsibilitiesTextAddingMsg() {
    return {
        type: ADD_NEW_RESPONSIBILITIES_TEXT_CLEAR_MSG
    }
}


export const editHaveToKnowText = generateEditingDcValRequestFunction({
    requestConst: EDIT_HAVE_TO_KNOW_TEXT_REQUEST,
    successConst: EDIT_HAVE_TO_KNOW_TEXT_SUCCESS,
    failConst: EDIT_HAVE_TO_KNOW_TEXT_FAIL,
    listName: "Повинен знати",
    apiURI: API_EDIT_HAVE_TO_KNOW_TEXT
});
export const editQualiffRequirText = generateEditingDcValRequestFunction({
    requestConst: EDIT_QUALIFF_REQUIR_TEXT_REQUEST,
    successConst: EDIT_QUALIFF_REQUIR_TEXT_SUCCESS,
    failConst: EDIT_QUALIFF_REQUIR_TEXT_FAIL,
    listName: "Кваліфікаційні вимоги",
    apiURI: API_EDIT_QUALIFF_REQUIR_TEXT
});
export const editResponsibilitiesText = generateEditingDcValRequestFunction({
    requestConst: EDIT_RESPONSIBILITIES_TEXT_REQUEST,
    successConst: EDIT_RESPONSIBILITIES_TEXT_SUCCESS,
    failConst: EDIT_RESPONSIBILITIES_TEXT_FAIL,
    listName: "Коди ДКХП",
    apiURI: API_EDIT_RESPONSIBILITIES_TEXT
});

export function editHaveToKnowTextClearMsg() {
    return {
        type: EDIT_HAVE_TO_KNOW_TEXT_CLEAR_MSG
    }
}

export function editQualiffRequirTextClearMsg() {
    return {
        type: EDIT_QUALIFF_REQUIR_TEXT_CLEAR_MSG
    }
}

export function editResponsibilitiesTextClearMsg() {
    return {
        type: EDIT_RESPONSIBILITIES_TEXT_CLEAR_MSG
    }
}
