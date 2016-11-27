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

    ADD_NEW_OCCUPATION_GROUP_REQUEST,
    ADD_NEW_OCCUPATION_GROUP_SUCCESS,
    ADD_NEW_OCCUPATION_GROUP_FAIL,

    DISMISS_MODAL_ADD_NEW_OCCUPATION_GROUP_LIST,
    DISMISS_MODAL_ADD_NEW_CLARIFICATION_ALERT,

    EDIT_CLARIFICATION_REQUEST,
    EDIT_CLARIFICATION_FAIL,
    EDIT_CLARIFICATION_SUCCESS,
    EDIT_CLARIFICATION_CLEAR_MSG,

    EDIT_OCCUPATION_GROUP_REQUEST,
    EDIT_OCCUPATION_GROUP_SUCCESS,
    EDIT_OCCUPATION_GROUP_FAIL,
    EDIT_OCCUPATION_GROUP_CLEAR_MSG,

    DEL_CLARIFICATION_REQUEST,
    DEL_CLARIFICATION_FAIL,
    DEL_CLARIFICATION_SUCCESS,
    DEL_CLARIFICATION_CLEAR_MSG,

    DEL_OCCUPATION_GROUP_REQUEST,
    DEL_OCCUPATION_GROUP_SUCCESS,
    DEL_OCCUPATION_GROUP_FAIL,
    DEL_OCCUPATION_GROUP_CLEAR_MSG,
} from '../constants/occupationNameInfo'

import {
    occupationGroupInpChange as addOccupForm_occupationGroupInpChange,
    clarificationInpChange as addOccupForm_clarificationInpChange
} from './addNewOccup'

import {
    occupationGroupInpChange as editOccupForm_occupationGroupInpChange,
    clarificationInpChange as editOccupForm_clarificationInpChange
} from './editOccup'

import * as API_URIs from '../constants/API_URIs';

import generateEditingDcValRequestFunction from "../utils/generateEditingOccupDcValRequestFunction"
import generateAddingOccupDcValRequestFunction from "../utils/generateAddingOccupDcValRequestFunction"
import generateDelOccupDcValRequestFunction from "../utils/generateDelOccupDcValRequestFunction"


export function fetchClarificationList() {
    return function (dispatch) {
        dispatch({
            type: FETCH_CLARIFICATION_LIST_REQUEST
        });

        return fetch(API_URIs.FETCH_CLARIFICATION_LIST)
            .then( response => {
                if(response.status === 404)
                    throw 'При отриманні списку Уточнення не знайдено відповідного методу на сервері!';
                if( 499 < response.status && response.status < 600 )
                    throw `При отриманні списку Уточнення сталася помилка ${response.status} на сервері!`;

                var contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json();
                } else {
                    return Promise.reject("Отримано некоректні дані для списку Уточнення");
                }
            })
            .then( data => {
                if (!(data instanceof Array) && !(data.idNameResponses instanceof Array))
                    return Promise.reject("Отримано некоректні дані для списку Уточнення");
                if (data && data.idNameResponses)
                    data = data.idNameResponses;
                dispatch({
                    type: FETCH_CLARIFICATION_LIST_SUCCESS,
                    data
                })
            })
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
                if(response.status === 404)
                    throw 'При отриманні списку Посадовий склад не знайдено відповідного методу на сервері!';
                if( 499 < response.status && response.status < 600 )
                    throw `При отриманні списку Посадовий склад сталася помилка ${response.status} на сервері!`;


                var contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json();
                } else {
                    return Promise.reject("Отримано некоректні дані для списку Посадовий склад");
                }
            })
            .then( data => {
                if (!(data instanceof Array) && !(data.idNameResponses instanceof Array))
                    return Promise.reject("Отримано некоректні дані для списку Посадовий склад");
                if (data && data.idNameResponses)
                    data = data.idNameResponses;
                dispatch({
                    type: FETCH_OCCUP_GROUP_LIST_SUCCESS,
                    data
                })
            })
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
                if(response.status === 404)
                    throw 'При отриманні списку Уточнювана посада не знайдено відповідного методу на сервері!';
                if( 499 < response.status && response.status < 600 )
                    throw `При отриманні списку Уточнювана посада сталася помилка ${response.status} на сервері!`;

                var contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json();
                } else {
                    return Promise.reject("Отримано некоректні дані для списку Уточнювана посада");
                }
            })
            .then( data => {
                if (!(data instanceof Array) && !(data.idNameResponses instanceof Array))
                    return Promise.reject("Отримано некоректні дані для списку Уточнювана посада");
                if (data && data.idNameResponses)
                    data = data.idNameResponses;
                dispatch({
                    type: FETCH_CLARIFIED_OCCUP_LIST_SUCCESS,
                    data
                })
            })
            .catch( error => dispatch({
                type: FETCH_CLARIFIED_OCCUP_LIST_FAIL,
                error
            }))
    }
}


export const addNewClarification = generateAddingOccupDcValRequestFunction({
    requestConst: ADD_NEW_CLARIFICATION_REQUEST,
    successConst: ADD_NEW_CLARIFICATION_SUCCESS,
    failConst: ADD_NEW_CLARIFICATION_FAIL,
    listName: "Уточнення",
    apiURI: API_URIs.ADD_NEW_CLARIFICATION,
});

export const addNewOccupationGroup = generateAddingOccupDcValRequestFunction({
    requestConst: ADD_NEW_OCCUPATION_GROUP_REQUEST,
    successConst: ADD_NEW_OCCUPATION_GROUP_SUCCESS,
    failConst: ADD_NEW_OCCUPATION_GROUP_FAIL,
    listName: "Посадовий склад",
    apiURI: API_URIs.ADD_NEW_OCCUPATION_GROUP,
});

export function addNewClarificationAndUpdateForm({ newVal, resForm}) {
    return addNewClarification({
        newVal,
        onSuccess(dispatch, results) {
            if(resForm == 'formEditOccup')
                dispatch(editOccupForm_clarificationInpChange(results));
            else
                dispatch(addOccupForm_clarificationInpChange(results));
        }
    });
}

export function addNewOccupationGroupAndUpdateForm({ newVal, resForm}) {
    return addNewOccupationGroup({
        newVal,
        onSuccess(dispatch, results) {
            if(resForm == 'formEditOccup')
                dispatch(editOccupForm_occupationGroupInpChange(results));
            else
                dispatch(addOccupForm_occupationGroupInpChange(results));
        }
    });
}

export function dismissModalAddNewClarificationAlert() {
    return {
        type: DISMISS_MODAL_ADD_NEW_CLARIFICATION_ALERT
    }
}

export function dismissModalAddNewOccupationGroupAlert() {
    return {
        type: DISMISS_MODAL_ADD_NEW_OCCUPATION_GROUP_LIST
    }
}


export const editClarification = generateEditingDcValRequestFunction({
    requestConst: EDIT_CLARIFICATION_REQUEST,
    successConst: EDIT_CLARIFICATION_SUCCESS,
    failConst: EDIT_CLARIFICATION_FAIL,
    listName: "Уточнення",
    apiURI: API_URIs.EDIT_CLARIFICATION
});

export const editOccupGroup = generateEditingDcValRequestFunction({
    requestConst: EDIT_OCCUPATION_GROUP_REQUEST,
    successConst: EDIT_OCCUPATION_GROUP_SUCCESS,
    failConst: EDIT_OCCUPATION_GROUP_FAIL,
    listName: "Посадовий склад",
    apiURI: API_URIs.EDIT_OCCUPATION_GROUP
});

export function editClarificationClearMsg() {
    return {
        type: EDIT_CLARIFICATION_CLEAR_MSG
    }
}

export function editOccupGroupClearMsg() {
    return {
        type: EDIT_OCCUPATION_GROUP_CLEAR_MSG
    }
}


export const delClarification = generateDelOccupDcValRequestFunction({
    requestConst: DEL_CLARIFICATION_REQUEST,
    successConst: DEL_CLARIFICATION_SUCCESS,
    failConst: DEL_CLARIFICATION_FAIL,
    listName: "Уточнення",
    apiURI: API_URIs.DEL_CLARIFICATION
});

export const delOccupGroup = generateDelOccupDcValRequestFunction({
    requestConst: DEL_OCCUPATION_GROUP_REQUEST,
    successConst: DEL_OCCUPATION_GROUP_SUCCESS,
    failConst: DEL_OCCUPATION_GROUP_FAIL,
    listName: "Посадовий склад",
    apiURI: API_URIs.DEL_OCCUPATION_GROUP
});

export function delClarificationClearMsg() {
    return {
        type: DEL_CLARIFICATION_CLEAR_MSG
    }
}

export function delOccupGroupClearMsg() {
    return {
        type: DEL_OCCUPATION_GROUP_CLEAR_MSG
    }
}
