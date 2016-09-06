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
                /*WARNING FOR TEST ONLY: */
                searchResData: {
                    itemsById: {
                        1: {
                            id: 1,
                            data: {
                                "occupationGroup": "Працівники сфери тусовок",
                                "occupationName": "Патімейкер 1 категорії",
                                "occupationNameMin": "Патімейк. 1 кат.",
                                "isIndependent": true,
                                "isVirtual": false,
                                "inKPI": true,
                                "creatingInStateDate": "2000-06-01T21:00:00.000Z",
                                "creatingInKPIDate": "2000-06-14T21:00:00.000Z",
                                "cancelingInStateDate": null,
                                "cancelingInKPIDate": "2000-06-14T21:00:00.000Z",
                                "codes": [
                                    {
                                        "portionStartDate": "2000-06-01T21:00:00.000Z",
                                        "portionEndDate": "2006-06-01T21:00:00.000Z",
                                        "codeKP": {
                                            "val": "2f23f",
                                            "id": 67
                                        },
                                        "codeETDK": null,
                                        "codeZKPPTR": {
                                            "val": "2f23f",
                                            "id": 32
                                        },
                                        "codeDKHP": {
                                            "val": "7f23rf",
                                            "id": 78
                                        }
                                    },
                                    {
                                        "portionStartDate": "2006-06-01T21:00:00.000Z",
                                        "portionEndDate": null,
                                        "codeKP": {
                                            "val": "2f23f",
                                            "id": 14
                                        },
                                        "codeETDK": {
                                            "val": "2f23f",
                                            "id": 90
                                        },
                                        "codeZKPPTR": null,
                                        "codeDKHP": null
                                    }
                                ],
                                "responsibilities": [
                                    {
                                        "text": "wefwefwefwefwefwefwefwefwef",
                                        "id": 67,
                                        "portionStartDate": "2016-08-10T21:07:51.718Z",
                                        "portionEndDate": "2016-09-10T21:07:51.718Z"
                                    },
                                    {
                                        "text": "fffffffffferfwefwefwefwefwefjjjjjjjjjjjjjjjjjeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeekkkkkkkkkkkkkkkkkkkkkkkkkk kkkkkkkkkkkkkkkkkkkkweffffffffffffffffwwwwwwwwwwwwwwwww hjhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",
                                        "id": 13,
                                        "portionStartDate": "2016-09-10T21:07:51.718Z",
                                        "portionEndDate": null
                                    }
                                ],
                                "haveToKnow": [
                                    {
                                        "text": "jhgfrderthrth",
                                        "id": null,
                                        "portionStartDate": "2016-08-04T21:07:51.718Z",
                                        "portionEndDate": null
                                    }
                                ],
                                "ualiffRequir": [
                                    {
                                        "text": "tyttyjty",
                                        "id": 4,
                                        "portionStartDate": "2016-08-03T21:07:51.718Z",
                                        "portionEndDate": "2016-08-04T21:07:51.718Z"
                                    },
                                    {
                                        "text": "hhhgfddfgergt",
                                        "id": null,
                                        "portionStartDate": "2016-08-04T21:07:51.718Z",
                                        "portionEndDate": null
                                    }
                                ]
                            }
                        },
                        2: {
                            id: 2,
                            data: {
                                "occupationGroup": "Працівники сфери тусовок",
                                "occupationName": "Патімейкер шейкер-шейкер",
                                "occupationNameMin": "Патімейк. 1 кат.",
                                "isIndependent": true,
                                "isVirtual": true,
                                "inKPI": false,
                                "creatingInStateDate": "2000-06-01T21:00:00.000Z",
                                "creatingInKPIDate": null,
                                "cancelingInStateDate": null,
                                "cancelingInKPIDate": null,
                                "codes": null,
                                "responsibilities": [
                                    {
                                        "text": "fwefwefwefwefwef",
                                        "id": 12,
                                        "portionStartDate": "2016-08-10T21:07:51.718Z",
                                        "portionEndDate": null
                                    }
                                ],
                                "haveToKnow": [
                                    {
                                        "text": "ojioojjiojoiwefwefwefwefowiejfwoiefjwoeifjwoiejfwoiefjwoiejfwoifjwoiefjwoeifjweoifjweoifjwoeifjweoifjwoefijwoeifjwefhieujwrnfowuieofhwjoefj",
                                        "id": 24,
                                        "portionStartDate": "2016-08-04T21:07:51.718Z",
                                        "portionEndDate": null
                                    }
                                ],
                                "ualiffRequir": [
                                    {
                                        "text": "wegrgweg",
                                        "id": 1,
                                        "portionStartDate": "2016-08-03T21:07:51.718Z",
                                        "portionEndDate": "2016-08-04T21:07:51.718Z"
                                    },
                                    {
                                        "text": "kmnjlk",
                                        "id": 433,
                                        "portionStartDate": "2016-08-04T21:07:51.718Z",
                                        "portionEndDate": null
                                    }
                                ]
                            }
                        }
                    },
                    itemsList: [1, 2]
                },
                showResults: true,
                /*WARNING FOR TEST ONLY: */
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