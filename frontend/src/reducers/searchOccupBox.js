import {
    SEARCH_OCCUP_BOX_FORM_SUBMIT_REQUEST,
    SEARCH_OCCUP_BOX_FORM_SUBMIT_FAIL,
    SEARCH_OCCUP_BOX_FORM_SUBMIT_SUCCESS,
    DISMISS_SEARCH_OCCUP_BOX_FORM_ALERT
} from '../constants/searchOccupBox'

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
        default:
            return state;
    }
}