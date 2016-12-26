import * as aTypes from '../constants/occupDescriptionTextsLists'

const initialState = {
    haveToKnowTextsList: {
        isFetching: false,
        fetchingError: "",
        isAddingNewVal: false,
        addingErrors: [],
        addingSuccess: false,
        isUpdatingVal: false,
        updatingSuccess: false,
        updatingError: null,
        isDeletingVal: false,
        deletingSuccess: false,
        deletingError: null,
        resultsOveralSize: 0,
        items : []
    },
    responsibilitiesTextsList: {
        isFetching: false,
        fetchingError: "",
        isAddingNewVal: false,
        addingErrors: [],
        addingSuccess: false,
        isUpdatingVal: false,
        updatingSuccess: false,
        updatingError: null,
        isDeletingVal: false,
        deletingSuccess: false,
        deletingError: null,
        resultsOveralSize: 0,
        items : []
    },
    qualiffRequirTextsList: {
        isFetching: false,
        fetchingError: "",
        isAddingNewVal: false,
        addingErrors: [],
        addingSuccess: false,
        isUpdatingVal: false,
        updatingSuccess: false,
        updatingError: null,
        isDeletingVal: false,
        deletingSuccess: false,
        deletingError: null,
        resultsOveralSize: 0,
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
                    fetchingError: ""
                }
            };
        case aTypes.FETCH_HAVE_TO_KNOW_TEXTS_LIST_SUCCESS:
            return {
                ...state,
                haveToKnowTextsList: {
                    items: action.data,
                    resultsOveralSize: action.resultsOveralSize,
                    isFetching: false,
                    fetchingError: ""
                }
            };
        case aTypes.FETCH_HAVE_TO_KNOW_TEXTS_LIST_FAIL:
            return {
                ...state,
                haveToKnowTextsList: {
                    ...state.haveToKnowTextsList,
                    isFetching: false,
                    fetchingError: action.error
                }
            };

        case aTypes.FETCH_RESPONSIBILITIES_TEXTS_LIST_REQUEST:
            return {
                ...state,
                responsibilitiesTextsList: {
                    ...state.responsibilitiesTextsList,
                    isFetching: true,
                    fetchingError: ""
                }
            };
        case aTypes.FETCH_RESPONSIBILITIES_TEXTS_LIST_SUCCESS:
            return {
                ...state,
                responsibilitiesTextsList: {
                    items: action.data,
                    resultsOveralSize: action.resultsOveralSize,
                    isFetching: false,
                    fetchingError: ""
                }
            };
        case aTypes.FETCH_RESPONSIBILITIES_TEXTS_LIST_FAIL:
            return {
                ...state,
                responsibilitiesTextsList: {
                    ...state.responsibilitiesTextsList,
                    isFetching: false,
                    fetchingError: action.error
                }
            };

        case aTypes.FETCH_QUALIFF_REQUIR_TEXTS_LIST_REQUEST:
            return {
                ...state,
                qualiffRequirTextsList: {
                    ...state.qualiffRequirTextsList,
                    isFetching: true,
                    fetchingError: ""
                }
            };
        case aTypes.FETCH_QUALIFF_REQUIR_TEXTS_LIST_SUCCESS:
            return {
                ...state,
                qualiffRequirTextsList: {
                    items: action.data,
                    resultsOveralSize: action.resultsOveralSize,
                    isFetching: false,
                    fetchingError: ""
                }
            };
        case aTypes.FETCH_QUALIFF_REQUIR_TEXTS_LIST_FAIL:
            return {
                ...state,
                qualiffRequirTextsList: {
                    ...state.qualiffRequirTextsList,
                    isFetching: false,
                    fetchingError: action.error
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


        case aTypes.EDIT_HAVE_TO_KNOW_TEXT_REQUEST:
            return {
                ...state,
                haveToKnowTextsList: {
                    ...state.haveToKnowTextsList,
                    isUpdatingVal: true,
                    updatingSuccess: false,
                    updatingError: null
                }
            };
        case aTypes.EDIT_HAVE_TO_KNOW_TEXT_SUCCESS:
            return {
                ...state,
                haveToKnowTextsList: {
                    ...state.haveToKnowTextsList,
                    items: state.haveToKnowTextsList.items.map(item => {
                        if(item.id === action.id)
                            return {
                                id: action.id,
                                textValue: action.newVal,
                                usingOccupations: item.usingOccupations.slice() //shallow copy на всяк випадок
                            };
                        else
                            return item;
                    }),
                    isUpdatingVal: false,
                    updatingSuccess: true,
                    updatingError: null
                }
            };
        case aTypes.EDIT_HAVE_TO_KNOW_TEXT_FAIL:
            return {
                ...state,
                haveToKnowTextsList: {
                    ...state.haveToKnowTextsList,
                    isUpdatingVal: false,
                    updatingSuccess: false,
                    updatingError: action.error,
                }
            };
        case aTypes.EDIT_HAVE_TO_KNOW_TEXT_CLEAR_MSG:
            return {
                ...state,
                haveToKnowTextsList: {
                    ...state.haveToKnowTextsList,
                    updatingSuccess: false,
                    updatingError: null
                }
            };

        case aTypes.EDIT_RESPONSIBILITIES_TEXT_REQUEST:
            return {
                ...state,
                responsibilitiesTextsList: {
                    ...state.responsibilitiesTextsList,
                    isUpdatingVal: true,
                    updatingSuccess: false,
                    updatingError: null
                }
            };
        case aTypes.EDIT_RESPONSIBILITIES_TEXT_SUCCESS:
            return {
                ...state,
                responsibilitiesTextsList: {
                    ...state.responsibilitiesTextsList,
                    items: state.responsibilitiesTextsList.items.map(item => {
                        if(item.id === action.id)
                            return {
                                id: action.id,
                                textValue: action.newVal,
                                usingOccupations: item.usingOccupations.slice() //shallow copy на всяк випадок
                            };
                        else
                            return item;
                    }),
                    isUpdatingVal: false,
                    updatingSuccess: true,
                    updatingError: null
                }
            };
        case aTypes.EDIT_RESPONSIBILITIES_TEXT_FAIL:
            return {
                ...state,
                responsibilitiesTextsList: {
                    ...state.responsibilitiesTextsList,
                    isUpdatingVal: false,
                    updatingSuccess: false,
                    updatingError: action.error,
                }
            };
        case aTypes.EDIT_RESPONSIBILITIES_TEXT_CLEAR_MSG:
            return {
                ...state,
                responsibilitiesTextsList: {
                    ...state.responsibilitiesTextsList,
                    updatingSuccess: false,
                    updatingError: null
                }
            };

        case aTypes.EDIT_QUALIFF_REQUIR_TEXT_REQUEST:
            return {
                ...state,
                qualiffRequirTextsList: {
                    ...state.qualiffRequirTextsList,
                    isUpdatingVal: true,
                    updatingSuccess: false,
                    updatingError: null
                }
            };
        case aTypes.EDIT_QUALIFF_REQUIR_TEXT_SUCCESS:
            return {
                ...state,
                qualiffRequirTextsList: {
                    ...state.qualiffRequirTextsList,
                    items: state.qualiffRequirTextsList.items.map(item => {
                        if(item.id === action.id)
                            return {
                                id: action.id,
                                textValue: action.newVal,
                                usingOccupations: item.usingOccupations.slice() //shallow copy на всяк випадок
                            };
                        else
                            return item;
                    }),
                    isUpdatingVal: false,
                    updatingSuccess: true,
                    updatingError: null
                }
            };
        case aTypes.EDIT_QUALIFF_REQUIR_TEXT_FAIL:
            return {
                ...state,
                qualiffRequirTextsList: {
                    ...state.qualiffRequirTextsList,
                    isUpdatingVal: false,
                    updatingSuccess: false,
                    updatingError: action.error,
                }
            };

        case aTypes.EDIT_QUALIFF_REQUIR_TEXT_CLEAR_MSG:
            return {
                ...state,
                qualiffRequirTextsList: {
                    ...state.qualiffRequirTextsList,
                    updatingSuccess: false,
                    updatingError: null
                }
            };


        case aTypes.DEL_HAVE_TO_KNOW_TEXT_REQUEST:
            return {
                ...state,
                haveToKnowTextsList: {
                    ...state.haveToKnowTextsList,
                    isDeletingVal: true,
                    deletingSuccess: false,
                    deletingError: null
                }
            };
        case aTypes.DEL_HAVE_TO_KNOW_TEXT_SUCCESS:
            let newHaveToKnowTextsList = state.haveToKnowTextsList.items.slice(),
                deletedItemIndex = newHaveToKnowTextsList.findIndex(item => item.id === action.id);
            newHaveToKnowTextsList.splice(deletedItemIndex, 1);
            return {
                ...state,
                haveToKnowTextsList: {
                    ...state.haveToKnowTextsList,
                    items: newHaveToKnowTextsList,
                    isDeletingVal: false,
                    deletingSuccess: true,
                    deletingError: null
                }
            };
        case aTypes.DEL_HAVE_TO_KNOW_TEXT_FAIL:
            return {
                ...state,
                haveToKnowTextsList: {
                    ...state.haveToKnowTextsList,
                    isDeletingVal: false,
                    deletingSuccess: false,
                    deletingError: action.error,
                }
            };
        case aTypes.DEL_HAVE_TO_KNOW_TEXT_CLEAR_MSG:
            return {
                ...state,
                haveToKnowTextsList: {
                    ...state.haveToKnowTextsList,
                    deletingSuccess: false,
                    deletingError: null
                }
            };

        case aTypes.DEL_RESPONSIBILITIES_TEXT_REQUEST:
            return {
                ...state,
                responsibilitiesTextsList: {
                    ...state.responsibilitiesTextsList,
                    isDeletingVal: true,
                    deletingSuccess: false,
                    deletingError: null
                }
            };
        case aTypes.DEL_RESPONSIBILITIES_TEXT_SUCCESS:
            let newResponsibilitiesTextsList = state.responsibilitiesTextsList.items.slice(),
                deletedItemIndex2 = newResponsibilitiesTextsList.findIndex(item => item.id === action.id);
            newResponsibilitiesTextsList.splice(deletedItemIndex2, 1);
            return {
                ...state,
                responsibilitiesTextsList: {
                    ...state.responsibilitiesTextsList,
                    items: newResponsibilitiesTextsList,
                    isDeletingVal: false,
                    deletingSuccess: true,
                    deletingError: null
                }
            };
        case aTypes.DEL_RESPONSIBILITIES_TEXT_FAIL:
            return {
                ...state,
                responsibilitiesTextsList: {
                    ...state.responsibilitiesTextsList,
                    isDeletingVal: false,
                    deletingSuccess: false,
                    deletingError: action.error,
                }
            };
        case aTypes.DEL_RESPONSIBILITIES_TEXT_CLEAR_MSG:
            return {
                ...state,
                responsibilitiesTextsList: {
                    ...state.responsibilitiesTextsList,
                    deletingSuccess: false,
                    deletingError: null
                }
            };

        case aTypes.DEL_QUALIFF_REQUIR_TEXT_REQUEST:
            return {
                ...state,
                qualiffRequirTextsList: {
                    ...state.qualiffRequirTextsList,
                    isDeletingVal: true,
                    deletingSuccess: false,
                    deletingError: null
                }
            };
        case aTypes.DEL_QUALIFF_REQUIR_TEXT_SUCCESS:
            let newQualiffRequirTextsList = state.qualiffRequirTextsList.items.slice(),
                deletedItemIndex3 = newQualiffRequirTextsList.findIndex(item => item.id === action.id);
            newQualiffRequirTextsList.splice(deletedItemIndex3, 1);
            return {
                ...state,
                qualiffRequirTextsList: {
                    ...state.qualiffRequirTextsList,
                    items: newQualiffRequirTextsList,
                    isDeletingVal: false,
                    deletingSuccess: true,
                    deletingError: null
                }
            };
        case aTypes.DEL_QUALIFF_REQUIR_TEXT_FAIL:
            return {
                ...state,
                qualiffRequirTextsList: {
                    ...state.qualiffRequirTextsList,
                    isDeletingVal: false,
                    deletingSuccess: false,
                    deletingError: action.error,
                }
            };

        case aTypes.DEL_QUALIFF_REQUIR_TEXT_CLEAR_MSG:
            return {
                ...state,
                qualiffRequirTextsList: {
                    ...state.qualiffRequirTextsList,
                    deletingSuccess: false,
                    deletingError: null
                }
            };


        default:
            return state
    }
}
