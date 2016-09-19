import {
    SEARCH_OCCUP_BOX_FORM_SUBMIT_REQUEST,
    SEARCH_OCCUP_BOX_FORM_SUBMIT_FAIL,
    SEARCH_OCCUP_BOX_FORM_SUBMIT_SUCCESS,
    DISMISS_SEARCH_OCCUP_BOX_FORM_ALERT
} from '../constants/searchOccupBox'

import { DEL_OCCUP_SUCCESS } from "../constants/delOccupation"

const initialState = {
    isSubmittngSearchForm: false,
    searchResData: null,
    searchError: null
};

export default function (state = initialState, action) {
    switch(action.type) {

        case SEARCH_OCCUP_BOX_FORM_SUBMIT_REQUEST:
            return {
                ...state,
                searchError: null,
                isSubmittngSearchForm: true,
            };
        case SEARCH_OCCUP_BOX_FORM_SUBMIT_SUCCESS:
            return {
                ...state,
                searchError: null,
                isSubmittngSearchForm: false,
                searchResData: action.response
            };
        case SEARCH_OCCUP_BOX_FORM_SUBMIT_FAIL:
            return {
                ...state,
                isSubmittngSearchForm: false,
                searchError: action.error,
            };

        case DISMISS_SEARCH_OCCUP_BOX_FORM_ALERT:
            return {
                ...state,
                searchError: null
            };

        case DEL_OCCUP_SUCCESS:
            let newSearchResData = Object.assign({}, state.searchResData),
                index = newSearchResData.itemsList.indexOf(action.occupId);
            delete newSearchResData.itemsById[action.occupId];
            if(index !== -1)     //якщо знайшовся видаляємий id посади
                newSearchResData.itemsList.splice(index, 1);
            return {
                ...state,
                searchResData: newSearchResData
            };

        default:
            return state;
    }
}