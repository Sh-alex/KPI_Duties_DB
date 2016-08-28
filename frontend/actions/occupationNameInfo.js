import {
    FETCH_CLARIFICATION_LIST_REQUEST,
    FETCH_CLARIFICATION_LIST_FAIL,
    FETCH_CLARIFICATION_LIST_SUCCESS,

    FETCH_CLARIFIED_OCCUP_LIST_REQUEST,
    FETCH_CLARIFIED_OCCUP_LIST_FAIL,
    FETCH_CLARIFIED_OCCUP_LIST_SUCCESS,

    FETCH_OCCUP_GROUP_LIST_REQUEST,
    FETCH_OCCUP_GROUP_LIST_FAIL,
    FETCH_OCCUP_GROUP_LIST_SUCCESS,

    ADD_NEW_CLARIFICATION_REQUEST,
    ADD_NEW_CLARIFICATION_FAIL,
    ADD_NEW_CLARIFICATION_SUCCESS,

    HIDE_ADD_FORM_SERVER_RESP_MSG,
    DISMISS_MODAL_ADD_NEW_CLARIFICATION_ALERT
} from '../constants/occupationNameInfo'

import { clarificationInpChange } from './addOccupBox'

import * as API_URIs from '../constants/API_URIs';

export function fetchClarificationList() {
    return function (dispatch) {
        dispatch({
            type: FETCH_CLARIFICATION_LIST_REQUEST
        });

        return fetch(API_URIs.FETCH_CLARIFICATION_LIST)
            .then( response => {
                var contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json().idNameResponses
                } else {
                    return Promise.reject("Отримано некоректні дані для списку Уточнення");
                }
            })
            .then( data => dispatch({
                type: FETCH_CLARIFICATION_LIST_SUCCESS,
                data
            }))
            .catch( error => dispatch({
                type: FETCH_CLARIFICATION_LIST_FAIL,
                error
            }))
    }
}

export function addNewClarification(newVal) {
    return function (dispatch) {
        dispatch({
            type: ADD_NEW_CLARIFICATION_REQUEST,
            newVal
        });

            return fetch( API_URIs.ADD_NEW_CLARIFICATION, {
                credentials: 'include',
                mode: 'cors',
                method: 'post',
                body: JSON.stringify( { newVal } ),
                headers: {
                    'Content-Type': 'application/json',
                    //'X-CSRFToken': CSRF_TOKEN
                }
            })
            .then( response => {
                if(response.status === 404)
                    throw 'При додаванні нового значення не знайдено відповідного методу на сервері!';
                if( 499 < response.status && response.status < 600 )
                    throw `При додаванні нового значення сталася помилка ${response.status} на сервері!`;

                var contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    let createdId = response.json().createdId,
                        error = response.json().error;
                    if(createdId != undefined)
                        return createdId;
                    if(error)
                        throw error;
                }
                throw "При додаванні нового значення не отримано ідентифікатор нового запису від сервера!";
            })
            .then( createdId => {
                let resObj = {
                    "id": createdId,
                    "textVal": newVal
                };
                dispatch({
                    type: ADD_NEW_CLARIFICATION_SUCCESS,
                    newItem: resObj
                });
                dispatch(clarificationInpChange(resObj));
            })
            .catch( error => dispatch({
                type: ADD_NEW_CLARIFICATION_FAIL,
                error: error || "Сталася неочікувана помилка при додаванні нового значення!"
            }))
    }
}

export function dismissModalAddNewClarificationAlert() {
    return {
        type: DISMISS_MODAL_ADD_NEW_CLARIFICATION_ALERT
    }
}

export function fetchOccupGroupList() {
    return function (dispatch) {
        dispatch({
            type: FETCH_OCCUP_GROUP_LIST_REQUEST
        });

        return fetch(API_URIs.FETCH_OCCUPATION_GROUP_LIST)
            .then( response => {
                var contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json().idNameResponses
                } else {
                    return Promise.reject("Отримано некоректні дані для списку Посадовий склад");
                }
            })
            .then( data => dispatch({
                type: FETCH_OCCUP_GROUP_LIST_SUCCESS,
                data
            }))
            .catch( error => dispatch({
                type: FETCH_OCCUP_GROUP_LIST_FAIL,
                error
            }))
    }
}

export function fetchClarifiedOccupList() {
    return function (dispatch) {
        dispatch({
            type: FETCH_CLARIFIED_OCCUP_LIST_REQUEST
        });

        return fetch(API_URIs.FETCH_CLARIFIED_OCCUP_LIST)
            .then( response => {
                var contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json().idNameResponses
                } else {
                    return Promise.reject("Отримано некоректні дані для списку Уточнювана посада");
                }
            })
            .then( data => dispatch({
                type: FETCH_CLARIFIED_OCCUP_LIST_SUCCESS,
                data
            }))
            .catch( error => dispatch({
                type: FETCH_CLARIFIED_OCCUP_LIST_FAIL,
                error
            }))
    }
}
