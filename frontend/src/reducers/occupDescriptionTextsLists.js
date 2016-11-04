import * as aTypes from '../constants/occupDescriptionTextsLists'

const initialState = {
    haveToKnowTextsList: {
        isFetching: false,
        isAddingNewVal: false,
        addingErrors: [],
        addingSuccess: false,
        errors: [],
        items : []
    },
    responsibilitiesTextsList: {
        isFetching: false,
        isAddingNewVal: false,
        addingErrors: [],
        addingSuccess: false,
        errors: [],
        items : []
    },
    qualiffRequirTextsList: {
        isFetching: false,
        isAddingNewVal: false,
        addingErrors: [],
        addingSuccess: false,
        errors: [],
        items : []
    }
};

export default function occupDescriptionTextsLists(state = initialState, action) {
    switch (action.type) {
        case aTypes.FETCH_HAVE_TO_KNOW_TEXTS_LIST_REQUEST:
            return {
                ...state,
                haveToKnowTextsList: {
                    ...state.haveToKnowTextsList,
                    isFetching: true,
                    errors: []
                }
            };
        case aTypes.FETCH_HAVE_TO_KNOW_TEXTS_LIST_SUCCESS:
            return {
                ...state,
                haveToKnowTextsList: {
                    items: action.data,
                    isFetching: false,
                    errors: []
                }
            };
        case aTypes.FETCH_HAVE_TO_KNOW_TEXTS_LIST_FAIL:
            return {
                ...state,
                haveToKnowTextsList: {
                    ...state.haveToKnowTextsList,
                    isFetching: false,
                    errors: [...state.haveToKnowTextsList.errors, action.error]
                }
            };

        case aTypes.FETCH_RESPONSIBILITIES_TEXTS_LIST_REQUEST:
            return {
                ...state,
                responsibilitiesTextsList: {
                    ...state.responsibilitiesTextsList,
                    isFetching: true,
                    errors: []
                }
            };
        case aTypes.FETCH_RESPONSIBILITIES_TEXTS_LIST_SUCCESS:
            return {
                ...state,
                responsibilitiesTextsList: {
                    items: action.data,
                    isFetching: false,
                    errors: []
                }
            };
        case aTypes.FETCH_RESPONSIBILITIES_TEXTS_LIST_FAIL:
            return {
                ...state,
                responsibilitiesTextsList: {
                    ...state.responsibilitiesTextsList,
                    isFetching: false,
                    errors: [...state.responsibilitiesTextsList.errors, action.error]
                }
            };

        case aTypes.FETCH_QUALIFF_REQUIR_TEXTS_LIST_REQUEST:
            return {
                ...state,
                qualiffRequirTextsList: {
                    ...state.qualiffRequirTextsList,
                    isFetching: true,
                    errors: []
                }
            };
        case aTypes.FETCH_QUALIFF_REQUIR_TEXTS_LIST_SUCCESS:
            return {
                ...state,
                qualiffRequirTextsList: {
                    items: action.data,
                    isFetching: false,
                    errors: []
                }
            };
        case aTypes.FETCH_QUALIFF_REQUIR_TEXTS_LIST_FAIL:
            return {
                ...state,
                qualiffRequirTextsList: {
                    ...state.qualiffRequirTextsList,
                    isFetching: false,
                    errors: [...state.qualiffRequirTextsList.errors, action.error]
                }
            };


        case aTypes.ADD_NEW_HAVE_TO_KNOW_TEXT_REQUEST:
            return {
                ...state,
                haveToKnowTextsList: {
                    ...state.haveToKnowTextsList,
                    isAddingNewVal: true,
                    addingSuccess: false,
                    addingErrors: []
                }
            };
        case aTypes.ADD_NEW_HAVE_TO_KNOW_TEXT_SUCCESS:
            return {
                ...state,
                haveToKnowTextsList: {
                    ...state.haveToKnowTextsList,
                    items: [...state.haveToKnowTextsList.items, action.newItem],
                    isAddingNewVal: false,
                    addingSuccess: true,
                    addingErrors: []
                }
            };
        case aTypes.ADD_NEW_HAVE_TO_KNOW_TEXT_FAIL:
            return {
                ...state,
                haveToKnowTextsList: {
                    ...state.haveToKnowTextsList,
                    isAddingNewVal: false,
                    addingSuccess: false,
                    addingErrors: [...state.haveToKnowTextsList.addingErrors, action.error]
                }
            };
        case aTypes.ADD_NEW_HAVE_TO_KNOW_TEXT_CLEAR_MSG:
            return {
                ...state,
                haveToKnowTextsList: {
                    ...state.haveToKnowTextsList,
                    addingSuccess: false,
                    addingErrors: []
                }
            };

        case aTypes.ADD_NEW_RESPONSIBILITIES_TEXT_REQUEST:
            return {
                ...state,
                responsibilitiesTextsList: {
                    ...state.responsibilitiesTextsList,
                    isAddingNewVal: true,
                    addingSuccess: false,
                    addingErrors: []
                }
            };
        case aTypes.ADD_NEW_RESPONSIBILITIES_TEXT_SUCCESS:
            return {
                ...state,
                responsibilitiesTextsList: {
                    ...state.responsibilitiesTextsList,
                    items: [...state.responsibilitiesTextsList.items, action.newItem],
                    isAddingNewVal: false,
                    addingSuccess: true,
                    addingErrors: []
                }
            };
        case aTypes.ADD_NEW_RESPONSIBILITIES_TEXT_FAIL:
            return {
                ...state,
                responsibilitiesTextsList: {
                    ...state.responsibilitiesTextsList,
                    isAddingNewVal: false,
                    addingSuccess: false,
                    addingErrors: [...state.responsibilitiesTextsList.addingErrors, action.error]
                }
            };
        case aTypes.ADD_NEW_RESPONSIBILITIES_TEXT_CLEAR_MSG:
            return {
                ...state,
                responsibilitiesTextsList: {
                    ...state.responsibilitiesTextsList,
                    addingSuccess: false,
                    addingErrors: []
                }
            };

        case aTypes.ADD_NEW_QUALIFF_REQUIR_TEXT_REQUEST:
            return {
                ...state,
                qualiffRequirTextsList: {
                    ...state.qualiffRequirTextsList,
                    isAddingNewVal: true,
                    addingSuccess: false,
                    addingErrors: []
                }
            };
        case aTypes.ADD_NEW_QUALIFF_REQUIR_TEXT_SUCCESS:
            return {
                ...state,
                qualiffRequirTextsList: {
                    ...state.qualiffRequirTextsList,
                    items: [...state.qualiffRequirTextsList.items, action.newItem],
                    isAddingNewVal: false,
                    addingSuccess: true,
                    addingErrors: []
                }
            };
        case aTypes.ADD_NEW_QUALIFF_REQUIR_TEXT_FAIL:
            return {
                ...state,
                qualiffRequirTextsList: {
                    ...state.qualiffRequirTextsList,
                    isAddingNewVal: false,
                    addingSuccess: false,
                    addingErrors: [...state.qualiffRequirTextsList.addingErrors, action.error]
                }
            };

        case aTypes.ADD_NEW_QUALIFF_REQUIR_TEXT_CLEAR_MSG:
            return {
                ...state,
                qualiffRequirTextsList: {
                    ...state.qualiffRequirTextsList,
                    addingSuccess: false,
                    addingErrors: []
                }
            };

        default:
            return state
    }
}
