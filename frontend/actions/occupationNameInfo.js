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
} from '../constants/occupationNameInfo'

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
                    return response.json()
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

export function fetchOccupGroupList() {
    return function (dispatch) {
        dispatch({
            type: FETCH_OCCUP_GROUP_LIST_REQUEST
        });

        return fetch(API_URIs.FETCH_OCCUPATION_GROUP_LIST)
            .then( response => {
                var contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json()
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
                    return response.json()
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
