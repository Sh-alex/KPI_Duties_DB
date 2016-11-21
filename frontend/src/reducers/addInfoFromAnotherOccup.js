import {
    ADD_INFO_FROM_ANOTHER_OCCUP_SEARCH_FORM_SUBMIT_REQUEST,
    ADD_INFO_FROM_ANOTHER_OCCUP_SEARCH_FORM_SUBMIT_FAIL,
    ADD_INFO_FROM_ANOTHER_OCCUP_SEARCH_FORM_SUBMIT_SUCCESS,
    HIDE_MODAL_ADD_INFO_FROM_ANOTHER_OCCUP,
    SHOW_MODAL_ADD_INFO_FROM_ANOTHER_OCCUP,
    DISMISS_FORM_ADD_INFO_FROM_ANOTHER_OCCUP_ALERT,
    GO_BACK_TO_ADD_INFO_FROM_ANOTHER_OCCUP_FORM,
    ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_CODES,
    ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_RESPONSIBLITIES,
    ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_HAVE_TO_KNOW,
    ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_QUALIFF_REQUIR
} from '../constants/addingInfoFromAnotherOccup'

const initialState = {
    show: false,
    typeText: "це поле",
    showResults: false,     //показується пошукова форма чи таблиця з результатами пошуку
    isSubmittngSearchForm: false,
    resPortionIndex: null,
    searchResData: null,
    resultsType: null,
    resForm: 'addForm',
    searchError: null
};

export default function (state = initialState, action) {
    switch(action.type) {
        case SHOW_MODAL_ADD_INFO_FROM_ANOTHER_OCCUP:
            return {
                ...state,
                showResults: false,
                typeText: action.data.typeText || "це поле",
                show: true,
                resultsType: action.data.typeId,
                resPortionIndex: action.data.resPortionIndex,
                resForm: action.data.resForm,
                searchError: null
            };
        case HIDE_MODAL_ADD_INFO_FROM_ANOTHER_OCCUP:
            return {
                ...state,
                show: false
            };

        case ADD_INFO_FROM_ANOTHER_OCCUP_SEARCH_FORM_SUBMIT_REQUEST:
            return {
                ...state,
                searchError: null,
                isSubmittngSearchForm: true,
            };
        case ADD_INFO_FROM_ANOTHER_OCCUP_SEARCH_FORM_SUBMIT_SUCCESS:
            return {
                ...state,
                showResults: true,
                searchError: null,
                isSubmittngSearchForm: false,
                searchResData: action.response
            };
        case ADD_INFO_FROM_ANOTHER_OCCUP_SEARCH_FORM_SUBMIT_FAIL:
            return {
                ...state,
                isSubmittngSearchForm: false,
                searchError: action.error,
            };

        case DISMISS_FORM_ADD_INFO_FROM_ANOTHER_OCCUP_ALERT:
            return {
                ...state,
                searchError: null
            };

        case GO_BACK_TO_ADD_INFO_FROM_ANOTHER_OCCUP_FORM:
            return {
                ...state,
                showResults: false
            };
        default:
            return state;
    }
}