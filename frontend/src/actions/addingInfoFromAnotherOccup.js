import {
    ADD_INFO_FROM_ANOTHER_OCCUP_SEARCH_FORM_SUBMIT_REQUEST,
    ADD_INFO_FROM_ANOTHER_OCCUP_SEARCH_FORM_SUBMIT_FAIL,
    ADD_INFO_FROM_ANOTHER_OCCUP_SEARCH_FORM_SUBMIT_SUCCESS,
    HIDE_MODAL_ADD_INFO_FROM_ANOTHER_OCCUP,
    SHOW_MODAL_ADD_INFO_FROM_ANOTHER_OCCUP,
    DISMISS_FORM_ADD_INFO_FROM_ANOTHER_OCCUP_ALERT,
    GO_BACK_TO_ADD_INFO_FROM_ANOTHER_OCCUP_FORM,
    ADD_INFO_FROM_ANOTHER_OCCUPATION
} from '../constants/addingInfoFromAnotherOccup'

import searchOccupations from "./searchOccupations"

function submitFormRequest (data) {
    return {
        type: ADD_INFO_FROM_ANOTHER_OCCUP_SEARCH_FORM_SUBMIT_REQUEST,
        data
    }
}

function submitFormSuccess (response) {
    return {
        type: ADD_INFO_FROM_ANOTHER_OCCUP_SEARCH_FORM_SUBMIT_SUCCESS,
        response
    }
}

function submitFormFail (error) {
    return {
        type: ADD_INFO_FROM_ANOTHER_OCCUP_SEARCH_FORM_SUBMIT_FAIL,
        error
    }
}

export function submitFormAddInfoFromAnotherOccup(data, dispatch) {
    return function (dispatch) {    //thunk щоб зробити асинхронний action
        return searchOccupations({  //безпосередньо сам action для пошуку
            data,
            onRequest: () => dispatch(submitFormRequest(data)),
            onSucces: (foundOccupations, searchGetParams) => dispatch(submitFormSuccess(foundOccupations)),
            onFail: (errorText) => dispatch(submitFormFail(errorText))
        });
    }
}


export function hideModalAddInfoFromAnotherOccup() {
    return {
        type: HIDE_MODAL_ADD_INFO_FROM_ANOTHER_OCCUP
    }
}

//data = {
// field
// }
export function showModalAddInfoFromAnotherOccup(data) {
    return {
        type: SHOW_MODAL_ADD_INFO_FROM_ANOTHER_OCCUP,
        data
    }
}

export function dismissFormAddInfoFromAnotherOccupAlert() {
    return {
        type: DISMISS_FORM_ADD_INFO_FROM_ANOTHER_OCCUP_ALERT
    }  
}

export function goBackToAddInfoFromAnotherOccupForm() {
    return {
        type: GO_BACK_TO_ADD_INFO_FROM_ANOTHER_OCCUP_FORM
    }
}

function addInfoFromAnotherOccupation_itself(data) {
    return {
        ...data,
        type: ADD_INFO_FROM_ANOTHER_OCCUPATION
    }
}

export function addInfoFromAnotherOccupation(data, dispatch) {
    return function (dispatch) {
        dispatch( addInfoFromAnotherOccupation_itself(data) );
        dispatch( hideModalAddInfoFromAnotherOccup() );
    }
}