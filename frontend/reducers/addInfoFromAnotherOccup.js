import {
    ADD_INFO_FROM_ANOTHER_OCCUP_SEARCH_FORM_SUBMIT_REQUEST,
    ADD_INFO_FROM_ANOTHER_OCCUP_SEARCH_FORM_SUBMIT_FAIL,
    ADD_INFO_FROM_ANOTHER_OCCUP_SEARCH_FORM_SUBMIT_SUCCESS,
    HIDE_MODAL_ADD_INFO_FROM_ANOTHER_OCCUP,
    SHOW_MODAL_ADD_INFO_FROM_ANOTHER_OCCUP,
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
};

export default function (state = initialState, action) {
    switch(action.type) {
        case SHOW_MODAL_ADD_INFO_FROM_ANOTHER_OCCUP:
            return {
                ...state,
                showResults: false,
                typeText: action.data.typeText || "це поле",
                show: true,
                resultsType: action.data.typeId
            };
        case HIDE_MODAL_ADD_INFO_FROM_ANOTHER_OCCUP:
            return {
                ...state,
                show: false
            };

        default:
            return state;
    }
}