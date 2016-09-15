import {
    SEARCH_OCCUP_BOX_FORM_SUBMIT_REQUEST,
    SEARCH_OCCUP_BOX_FORM_SUBMIT_FAIL,
    SEARCH_OCCUP_BOX_FORM_SUBMIT_SUCCESS,
    DISMISS_SEARCH_OCCUP_BOX_FORM_ALERT
} from '../constants/searchOccupBox'

import {
    CHANGE_SEARCH_PAGE_URI
} from "../constants/Routing"

import searchOccupations from "./searchOccupations"

function submitFormRequest (data) {
    return {
        type: SEARCH_OCCUP_BOX_FORM_SUBMIT_REQUEST,
        data
    }
}

function submitFormSuccess (response) {
    return {
        type: SEARCH_OCCUP_BOX_FORM_SUBMIT_SUCCESS,
        response
    }
}

function submitFormFail (error) {
    return {
        type: SEARCH_OCCUP_BOX_FORM_SUBMIT_FAIL,
        error
    }
}

export function searchOccupBoxFormSubmit(data, dispatch) {
    return function (dispatch) {    //thunk щоб зробити асинхронний action
        return searchOccupations({  //безпосередньо сам action для пошуку
            data,
            onRequest: () => dispatch(submitFormRequest(data)),
            onSucces: (foundOccupations, searchGetParams) => {
                dispatch(submitFormSuccess(foundOccupations));
                dispatch(changeSearchPageURI(location.pathname + searchGetParams));
            },
            onFail: (errorText) => dispatch(submitFormFail(errorText))
        });
    }
}


export function changeSearchPageURI(URI) {
    //TODO: змінювати URI сторінки
    return {
        type: CHANGE_SEARCH_PAGE_URI
    }
}


export function dismissSearchOccupBoxFormAlert() {
    return {
        type: DISMISS_SEARCH_OCCUP_BOX_FORM_ALERT
    }
}
