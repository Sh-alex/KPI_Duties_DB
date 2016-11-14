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
    ADD_NEW_KP_CODE_CLEAR_MSG,

    ADD_NEW_ZKPPTR_CODE_REQUEST,
    ADD_NEW_ZKPPTR_CODE_SUCCESS,
    ADD_NEW_ZKPPTR_CODE_FAIL,
    ADD_NEW_ZKPPTR_CODE_CLEAR_MSG,

    ADD_NEW_ETDK_CODE_REQUEST,
    ADD_NEW_ETDK_CODE_SUCCESS,
    ADD_NEW_ETDK_CODE_FAIL,
    ADD_NEW_ETDK_CODE_CLEAR_MSG,

    ADD_NEW_DKHP_CODE_REQUEST,
    ADD_NEW_DKHP_CODE_SUCCESS,
    ADD_NEW_DKHP_CODE_FAIL,
    ADD_NEW_DKHP_CODE_CLEAR_MSG,

    EDIT_KP_CODE_REQUEST,
    EDIT_KP_CODE_SUCCESS,
    EDIT_KP_CODE_FAIL,
    EDIT_KP_CODE_CLEAR_MSG,

    EDIT_ZKPPTR_CODE_REQUEST,
    EDIT_ZKPPTR_CODE_SUCCESS,
    EDIT_ZKPPTR_CODE_FAIL,
    EDIT_ZKPPTR_CODE_CLEAR_MSG,

    EDIT_ETDK_CODE_REQUEST,
    EDIT_ETDK_CODE_SUCCESS,
    EDIT_ETDK_CODE_FAIL,
    EDIT_ETDK_CODE_CLEAR_MSG,

    EDIT_DKHP_CODE_REQUEST,
    EDIT_DKHP_CODE_SUCCESS,
    EDIT_DKHP_CODE_FAIL,
    EDIT_DKHP_CODE_CLEAR_MSG,

    DEL_KP_CODE_REQUEST,
    DEL_KP_CODE_SUCCESS,
    DEL_KP_CODE_FAIL,
    DEL_KP_CODE_CLEAR_MSG,

    DEL_ZKPPTR_CODE_REQUEST,
    DEL_ZKPPTR_CODE_SUCCESS,
    DEL_ZKPPTR_CODE_FAIL,
    DEL_ZKPPTR_CODE_CLEAR_MSG,

    DEL_ETDK_CODE_REQUEST,
    DEL_ETDK_CODE_SUCCESS,
    DEL_ETDK_CODE_FAIL,
    DEL_ETDK_CODE_CLEAR_MSG,

    DEL_DKHP_CODE_REQUEST,
    DEL_DKHP_CODE_SUCCESS,
    DEL_DKHP_CODE_FAIL,
    DEL_DKHP_CODE_CLEAR_MSG,
} from '../constants/occupCodesLists'

import * as API_URIs from '../constants/API_URIs';

import generateEditingOccupDcValRequestFunction from "../utils/generateEditingOccupDcValRequestFunction"
import generateAddingOccupDcValRequestFunction from "../utils/generateAddingOccupDcValRequestFunction"
import generateDelOccupDcValRequestFunction from "../utils/generateDelOccupDcValRequestFunction"

import {
    KPCodeInpChange as addOccupForm_KPCodeInpChange,
    DKHPCodeInpChange as addOccupForm_DKHPCodeInpChange,
    ZKPPTRCodeInpChange as addOccupForm_ZKPPTRCodeInpChange,
    ETDKCodeInpChange as addOccupForm_ETDKCodeInpChange,
} from './addNewOccup'

import {
    KPCodeInpChange as editOccupForm_KPCodeInpChange,
    DKHPCodeInpChange as editOccupForm_DKHPCodeInpChange,
    ZKPPTRCodeInpChange as editOccupForm_ZKPPTRCodeInpChange,
    ETDKCodeInpChange as editOccupForm_ETDKCodeInpChange,
} from './editOccup'

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


export const addNewKPCode = generateAddingOccupDcValRequestFunction({
    requestConst: ADD_NEW_KP_CODE_REQUEST,
    successConst: ADD_NEW_KP_CODE_SUCCESS,
    failConst: ADD_NEW_KP_CODE_FAIL,
    listName: "Коди КП",
    apiURI: API_URIs.ADD_NEW_KP_CODE,
});

export const addNewETDKCode = generateAddingOccupDcValRequestFunction({
    requestConst: ADD_NEW_ETDK_CODE_REQUEST,
    successConst: ADD_NEW_ETDK_CODE_SUCCESS,
    failConst: ADD_NEW_ETDK_CODE_FAIL,
    listName: "Коди ЄТДК",
    apiURI: API_URIs.ADD_NEW_ETDK_CODE,
});

export const addNewDKHPCode = generateAddingOccupDcValRequestFunction({
    requestConst: ADD_NEW_DKHP_CODE_REQUEST,
    successConst: ADD_NEW_DKHP_CODE_SUCCESS,
    failConst: ADD_NEW_DKHP_CODE_FAIL,
    listName: "Коди ДКХП",
    apiURI: API_URIs.ADD_NEW_DKHP_CODE,
});

export const addNewZKPPTRCode = generateAddingOccupDcValRequestFunction({
    requestConst: ADD_NEW_ZKPPTR_CODE_REQUEST,
    successConst: ADD_NEW_ZKPPTR_CODE_SUCCESS,
    failConst: ADD_NEW_ZKPPTR_CODE_FAIL,
    listName: "Коди ЗКППТР",
    apiURI: API_URIs.ADD_NEW_ZKPPTR_CODE,
});


export function addNewKPCodeAndUpdateForm({ newVal, resPortionIndex, resForm}) {
    return addNewKPCode({
        newVal,
        onSuccess(dispatch, results) {
            if(resForm == 'formEditOccup')
                dispatch(editOccupForm_KPCodeInpChange(results, resPortionIndex));
            else if(resForm == 'formAddNewOccup')
                dispatch(addOccupForm_KPCodeInpChange(results, resPortionIndex));
            else
                console.warn("Called addNewKPCodeAndUpdateForm, but resForm == ", resForm);
        }
    });
}

export function addNewETDKCodeAndUpdateForm({ newVal, resPortionIndex, resForm}) {
    return addNewETDKCode({
        newVal,
        onSuccess(dispatch, results) {
            if(resForm == 'formEditOccup')
                dispatch(editOccupForm_ETDKCodeInpChange(results, resPortionIndex));
            else if(resForm == 'formAddNewOccup')
                dispatch(addOccupForm_ETDKCodeInpChange(results, resPortionIndex));
            else
                console.warn("Called addNewETDKCodeAndUpdateForm, but resForm == ", resForm);
        }
    });
}

export function addNewDKHPCodeAndUpdateForm({ newVal, resPortionIndex, resForm}) {
    return addNewDKHPCode({
        newVal,
        onSuccess(dispatch, results) {
            if(resForm == 'formEditOccup')
                dispatch(editOccupForm_DKHPCodeInpChange(results, resPortionIndex));
            else if(resForm == 'formAddNewOccup')
                dispatch(addOccupForm_DKHPCodeInpChange(results, resPortionIndex));
            else
                console.warn("Called addNewDKHPCodeAndUpdateForm, but resForm == ", resForm);
        }
    });
}

export function addNewZKPPTRCodeAndUpdateForm({ newVal, resPortionIndex, resForm}) {
    return addNewZKPPTRCode({
        newVal,
        onSuccess(dispatch, results) {
            if(resForm == 'formEditOccup')
                dispatch(editOccupForm_ZKPPTRCodeInpChange(results, resPortionIndex));
            else if(resForm == 'formAddNewOccup')
                dispatch(addOccupForm_ZKPPTRCodeInpChange(results, resPortionIndex));
            else
                console.warn("Called addNewZKPPTRCodeAndUpdateForm, but resForm == ", resForm);
        }
    });
}


export function clearKPCodeAddingMsg() {
    return {
        type: ADD_NEW_KP_CODE_CLEAR_MSG
    }
}

export function clearDKHPCodeAddingMsg() {
    return {
        type: ADD_NEW_DKHP_CODE_CLEAR_MSG
    }
}

export function clearETDKCodeAddingMsg() {
    return {
        type: ADD_NEW_ETDK_CODE_CLEAR_MSG
    }
}

export function clearZKPPTRCodeAddingMsg() {
    return {
        type: ADD_NEW_ZKPPTR_CODE_CLEAR_MSG
    }
}


export const editKPCode = generateEditingOccupDcValRequestFunction({
    requestConst: EDIT_KP_CODE_REQUEST,
    successConst: EDIT_KP_CODE_SUCCESS,
    failConst: EDIT_KP_CODE_FAIL,
    listName: "Коди КП",
    apiURI: API_URIs.EDIT_KP_CODE
});
export const editETDKCode = generateEditingOccupDcValRequestFunction({
    requestConst: EDIT_ETDK_CODE_REQUEST,
    successConst: EDIT_ETDK_CODE_SUCCESS,
    failConst: EDIT_ETDK_CODE_FAIL,
    listName: "Коди ЄТДК",
    apiURI: API_URIs.EDIT_ETDK_CODE
});
export const editDKHPCode = generateEditingOccupDcValRequestFunction({
    requestConst: EDIT_DKHP_CODE_REQUEST,
    successConst: EDIT_DKHP_CODE_SUCCESS,
    failConst: EDIT_DKHP_CODE_FAIL,
    listName: "Коди ДКХП",
    apiURI: API_URIs.EDIT_DKHP_CODE
});
export const editZKPPTRCode = generateEditingOccupDcValRequestFunction({
    requestConst: EDIT_ZKPPTR_CODE_REQUEST,
    successConst: EDIT_ZKPPTR_CODE_SUCCESS,
    failConst: EDIT_ZKPPTR_CODE_FAIL,
    listName: "Коди ЗКППТР",
    apiURI: API_URIs.EDIT_ZKPPTR_CODE
});

export function editKPCodeClearMsg() {
    return {
        type: EDIT_KP_CODE_CLEAR_MSG
    }
}

export function editETDKCodeClearMsg() {
    return {
        type: EDIT_ETDK_CODE_CLEAR_MSG
    }
}

export function editDKHPCodeClearMsg() {
    return {
        type: EDIT_DKHP_CODE_CLEAR_MSG
    }
}

export function editZKPPTRCodeClearMsg() {
    return {
        type: EDIT_ZKPPTR_CODE_CLEAR_MSG
    }
}


export const delKPCode = generateDelOccupDcValRequestFunction({
    requestConst: DEL_KP_CODE_REQUEST,
    successConst: DEL_KP_CODE_SUCCESS,
    failConst: DEL_KP_CODE_FAIL,
    listName: "Коди КП",
    apiURI: API_URIs.DEL_KP_CODE
});
export const delETDKCode = generateDelOccupDcValRequestFunction({
    requestConst: DEL_ETDK_CODE_REQUEST,
    successConst: DEL_ETDK_CODE_SUCCESS,
    failConst: DEL_ETDK_CODE_FAIL,
    listName: "Коди ЄТДК",
    apiURI: API_URIs.DEL_ETDK_CODE
});
export const delDKHPCode = generateDelOccupDcValRequestFunction({
    requestConst: DEL_DKHP_CODE_REQUEST,
    successConst: DEL_DKHP_CODE_SUCCESS,
    failConst: DEL_DKHP_CODE_FAIL,
    listName: "Коди ДКХП",
    apiURI: API_URIs.DEL_DKHP_CODE
});
export const delZKPPTRCode = generateDelOccupDcValRequestFunction({
    requestConst: DEL_ZKPPTR_CODE_REQUEST,
    successConst: DEL_ZKPPTR_CODE_SUCCESS,
    failConst: DEL_ZKPPTR_CODE_FAIL,
    listName: "Коди ЗКППТР",
    apiURI: API_URIs.DEL_ZKPPTR_CODE
});

export function delKPCodeClearMsg() {
    return {
        type: DEL_KP_CODE_CLEAR_MSG
    }
}

export function delETDKCodeClearMsg() {
    return {
        type: DEL_ETDK_CODE_CLEAR_MSG
    }
}

export function delDKHPCodeClearMsg() {
    return {
        type: DEL_DKHP_CODE_CLEAR_MSG
    }
}

export function delZKPPTRCodeClearMsg() {
    return {
        type: DEL_ZKPPTR_CODE_CLEAR_MSG
    }
}