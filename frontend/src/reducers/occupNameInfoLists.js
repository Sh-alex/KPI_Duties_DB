import {
    FETCH_CLARIFICATION_LIST_REQUEST,
    FETCH_CLARIFICATION_LIST_FAIL,
    FETCH_CLARIFICATION_LIST_SUCCESS,

    FETCH_CLARIFIED_OCCUP_LIST_REQUEST,
    FETCH_CLARIFIED_OCCUP_LIST_FAIL,
    FETCH_CLARIFIED_OCCUP_LIST_SUCCESS,

    FETCH_OCCUP_GROUP_LIST_REQUEST,
    FETCH_OCCUP_GROUP_LIST_FAIL,
    FETCH_OCCUP_GROUP_LIST_SUCCESS,

    ADD_NEW_CLARIFICATION_REQUEST,
    ADD_NEW_CLARIFICATION_FAIL,
    ADD_NEW_CLARIFICATION_SUCCESS,

    ADD_NEW_OCCUPATION_GROUP_REQUEST,
    ADD_NEW_OCCUPATION_GROUP_SUCCESS,
    ADD_NEW_OCCUPATION_GROUP_FAIL,

    DISMISS_MODAL_ADD_NEW_OCCUPATION_GROUP_LIST,
    DISMISS_MODAL_ADD_NEW_CLARIFICATION_ALERT,

    EDIT_CLARIFICATION_REQUEST,
    EDIT_CLARIFICATION_FAIL,
    EDIT_CLARIFICATION_SUCCESS,
    EDIT_CLARIFICATION_CLEAR_MSG,

    EDIT_OCCUPATION_GROUP_REQUEST,
    EDIT_OCCUPATION_GROUP_SUCCESS,
    EDIT_OCCUPATION_GROUP_FAIL,
    EDIT_OCCUPATION_GROUP_CLEAR_MSG,

    DEL_CLARIFICATION_REQUEST,
    DEL_CLARIFICATION_FAIL,
    DEL_CLARIFICATION_SUCCESS,
    DEL_CLARIFICATION_CLEAR_MSG,

    DEL_OCCUPATION_GROUP_REQUEST,
    DEL_OCCUPATION_GROUP_SUCCESS,
    DEL_OCCUPATION_GROUP_FAIL,
    DEL_OCCUPATION_GROUP_CLEAR_MSG,
} from '../constants/occupationNameInfo'

const initialState = {
    occupationGroupList: {
        isFetching: false,
        fetchingError: "",
        items : [],
        resultsOveralSize: 0,
        isAddingNewVal: false,
        addingSuccess: false,
        addingErrors: [],
        isUpdatingVal: false,
        updatingSuccess: false,
        updatingError: null,
        isDeletingVal: false,
        deletingSuccess: false,
        deletingError: null,
        // items : [
        //     {
        //         "id": 0,
        //         "textValue": "Керівники",
        //         "usingOccupations" [4,3] //id посад що використовують це значення
        //     },
        //     {
        //         "id": 1,
        //         "textValue": "Професіонали"
        //         "usingOccupations" [1,2]
        //     },
        //     {
        //         "id": 2,
        //         "textValue": "Фахівці"
        //         "usingOccupations" []
        //     },
        //     {
        //         "id": 3,
        //         "textValue": "Технічні службовці"
        //         "usingOccupations" [0]
        //     },
        //     {
        //         "id": 4,
        //         "textValue": "Найпростіші професії"
        //         "usingOccupations" [1,2,3]
        //     }
        // ],
    },
    clarifiedOccupationList: {
        isFetching: false,
        fetchingError: "",
        resultsOveralSize: 0,
        items : []
    },
    clarificationList: {
        isFetching: false,
        fetchingError: "",
        items : [],
        resultsOveralSize: 0,
        isAddingNewVal: false,
        addingErrors: [],
        addingSuccess: false,
        isUpdatingVal: false,
        updatingSuccess: false,
        updatingError: null,
        isDeletingVal: false,
        deletingSuccess: false,
        deletingError: null,
    }
};

export default function occupNameInfoLists(state = initialState, action) {
    switch (action.type) {
        case ADD_NEW_CLARIFICATION_REQUEST:
            return {
                ...state,
                clarificationList: {
                    ...state.clarificationList,
                    isAddingNewVal: true,
                    addingSuccess: false,
                    addingErrors: []
                }
            };
        case ADD_NEW_CLARIFICATION_SUCCESS:
            return {
                ...state,
                clarificationList: {
                    ...state.clarificationList,
                    items: [...state.clarificationList.items, action.newItem],
                    isAddingNewVal: false,
                    addingSuccess: true,
                    addingErrors: []
                }
            };
        case ADD_NEW_CLARIFICATION_FAIL:
            return {
                ...state,
                clarificationList: {
                    ...state.clarificationList,
                    isAddingNewVal: false,
                    addingSuccess: false,
                    addingErrors: [...state.clarificationList.addingErrors, action.error]
                }
            };

        case DISMISS_MODAL_ADD_NEW_CLARIFICATION_ALERT:
            return {
                ...state,
                clarificationList: {
                    ...state.clarificationList,
                    addingSuccess: false,
                    addingErrors: []
                }
            };

        case ADD_NEW_OCCUPATION_GROUP_REQUEST:
            return {
                ...state,
                occupationGroupList: {
                    ...state.occupationGroupList,
                    isAddingNewVal: true,
                    addingSuccess: false,
                    addingErrors: []
                }
            };
        case ADD_NEW_OCCUPATION_GROUP_SUCCESS:
            return {
                ...state,
                occupationGroupList: {
                    ...state.occupationGroupList,
                    items: [...state.occupationGroupList.items, action.newItem],
                    isAddingNewVal: false,
                    addingSuccess: true,
                    addingErrors: []
                }
            };
        case ADD_NEW_OCCUPATION_GROUP_FAIL:
            return {
                ...state,
                occupationGroupList: {
                    ...state.occupationGroupList,
                    isAddingNewVal: false,
                    addingSuccess: false,
                    addingErrors: [...state.occupationGroupList.addingErrors, action.error]
                }
            };

        case DISMISS_MODAL_ADD_NEW_OCCUPATION_GROUP_LIST:
            return {
                ...state,
                occupationGroupList: {
                    ...state.occupationGroupList,
                    addingSuccess: false,
                    addingErrors: []
                }
            };

        case FETCH_OCCUP_GROUP_LIST_REQUEST:
            return {
                ...state,
                occupationGroupList: {
                    ...state.occupationGroupList,
                    isFetching: true,
                    fetchingError: ""
                }
            };
        case FETCH_OCCUP_GROUP_LIST_SUCCESS:
            return {
                ...state,
                occupationGroupList: {
                    items: action.data,
                    resultsOveralSize: action.resultsOveralSize,
                    isFetching: false,
                    fetchingError: ""
                }
            };
        case FETCH_OCCUP_GROUP_LIST_FAIL:
            return {
                ...state,
                occupationGroupList: {
                    ...state.occupationGroupList,
                    isFetching: false,
                    fetchingError: action.error
                }
            };

        case FETCH_CLARIFICATION_LIST_REQUEST:
            return {
                ...state,
                clarificationList: {
                    ...state.clarificationList,
                    isFetching: true,
                    fetchingError: ""
                }
            };
        case FETCH_CLARIFICATION_LIST_SUCCESS:
            return {
                ...state,
                clarificationList: {
                    items: action.data,
                    resultsOveralSize: action.resultsOveralSize,
                    isFetching: false,
                    fetchingError: ""
                }
            };
        case FETCH_CLARIFICATION_LIST_FAIL:
            return {
                ...state,
                clarificationList: {
                    ...state.clarificationList,
                    isFetching: false,
                    fetchingError: action.error
                }
            };

        case FETCH_CLARIFIED_OCCUP_LIST_REQUEST:
            return {
                ...state,
                clarifiedOccupationList: {
                    ...state.clarifiedOccupationList,
                    isFetching: true,
                    fetchingError: ""
                }
            };
        case FETCH_CLARIFIED_OCCUP_LIST_SUCCESS:
            return {
                ...state,
                clarifiedOccupationList: {
                    items: action.data,
                    resultsOveralSize: action.resultsOveralSize,
                    isFetching: false,
                    fetchingError: ""
                }
            };
        case FETCH_CLARIFIED_OCCUP_LIST_FAIL:
            return {
                ...state,
                clarifiedOccupationList: {
                    ...state.clarifiedOccupationList,
                    isFetching: false,
                    fetchingError: action.error
                }
            };


        case EDIT_CLARIFICATION_REQUEST:
            return {
                ...state,
                clarificationList: {
                    ...state.clarificationList,
                    isUpdatingVal: true,
                    updatingSuccess: false,
                    updatingError: null,
                }
            };
        case EDIT_CLARIFICATION_SUCCESS:
            return {
                ...state,
                clarificationList: {
                    ...state.clarificationList,
                    isUpdatingVal: false,
                    updatingSuccess: true,
                    updatingError: null,
                    //TODO: треба змінити щоб items було хеш-таблицею, бо пробігати по масиву ващє не ок((
                    items: state.clarificationList.items.map(item => {
                        if(item.id === action.id)
                            return {
                                id: action.id,
                                textValue: action.newVal,
                                usingOccupations: item.usingOccupations.slice() //shallow copy на всяк випадок
                            };
                        else
                            return item;
                    }),
                }
            };
        case EDIT_CLARIFICATION_FAIL:
            return {
                ...state,
                clarificationList: {
                    ...state.clarificationList,
                    isUpdatingVal: false,
                    updatingSuccess: false,
                    updatingError: action.error,
                }
            };
        case EDIT_CLARIFICATION_CLEAR_MSG:
            return {
                ...state,
                clarificationList: {
                    ...state.clarificationList,
                    updatingSuccess: false,
                    updatingError:null,
                }
            };


        case EDIT_OCCUPATION_GROUP_REQUEST:
            return {
                ...state,
                occupationGroupList: {
                    ...state.occupationGroupList,
                    isUpdatingVal: true,
                    updatingSuccess: false,
                    updatingError: null,
                }
            };
        case EDIT_OCCUPATION_GROUP_SUCCESS:
            return {
                ...state,
                occupationGroupList: {
                    ...state.occupationGroupList,
                    isUpdatingVal: false,
                    updatingSuccess: true,
                    updatingError: null,
                    items: state.occupationGroupList.items.map(item => {
                        if(item.id === action.id)
                            return {
                                id: action.id,
                                textValue: action.newVal,
                                usingOccupations: item.usingOccupations.slice() //shallow copy на всяк випадок
                            };
                        else
                            return item;
                    }),
                }
            };
        case EDIT_OCCUPATION_GROUP_FAIL:
            return {
                ...state,
                occupationGroupList: {
                    ...state.occupationGroupList,
                    isUpdatingVal: false,
                    updatingSuccess: false,
                    updatingError: action.error,
                }
            };

        case EDIT_OCCUPATION_GROUP_CLEAR_MSG:
            return {
                ...state,
                occupationGroupList: {
                    ...state.occupationGroupList,
                    updatingSuccess: false,
                    updatingError: null
                }
            };


        case DEL_CLARIFICATION_REQUEST:
            return {
                ...state,
                clarificationList: {
                    ...state.clarificationList,
                    isDeletingVal: true,
                    deletingSuccess: false,
                    deletingError: null,
                }
            };
        case DEL_CLARIFICATION_SUCCESS:
            let newClarificationList = state.clarificationList.items.slice(),
                deletedItemIndex = newClarificationList.findIndex(item => item.id === action.id);
            newClarificationList.splice(deletedItemIndex, 1);
            return {
                ...state,
                clarificationList: {
                    ...state.clarificationList,
                    isDeletingVal: false,
                    deletingSuccess: true,
                    deletingError: null,
                    items: newClarificationList
                }
            };
        case DEL_CLARIFICATION_FAIL:
            return {
                ...state,
                clarificationList: {
                    ...state.clarificationList,
                    isDeletingVal: false,
                    deletingSuccess: false,
                    deletingError: action.error,
                }
            };
        case DEL_CLARIFICATION_CLEAR_MSG:
            return {
                ...state,
                clarificationList: {
                    ...state.clarificationList,
                    deletingSuccess: false,
                    deletingError:null,
                }
            };


        case DEL_OCCUPATION_GROUP_REQUEST:
            return {
                ...state,
                occupationGroupList: {
                    ...state.occupationGroupList,
                    isDeletingVal: true,
                    deletingSuccess: false,
                    deletingError: null,
                }
            };
        case DEL_OCCUPATION_GROUP_SUCCESS:
            let newOccupationGroupList = state.occupationGroupList.items.slice(),
                deletedItemIndex2 = newOccupationGroupList.findIndex(item => item.id === action.id);
            newOccupationGroupList.splice(deletedItemIndex2, 1);

            return {
                ...state,
                occupationGroupList: {
                    ...state.occupationGroupList,
                    isDeletingVal: false,
                    deletingSuccess: true,
                    deletingError: null,
                    items: newOccupationGroupList,
                }
            };
        case DEL_OCCUPATION_GROUP_FAIL:
            return {
                ...state,
                occupationGroupList: {
                    ...state.occupationGroupList,
                    isDeletingVal: false,
                    deletingSuccess: false,
                    deletingError: action.error,
                }
            };

        case DEL_OCCUPATION_GROUP_CLEAR_MSG:
            return {
                ...state,
                occupationGroupList: {
                    ...state.occupationGroupList,
                    deletingSuccess: false,
                    deletingError: null
                }
            };


        default:
            return state
    }
}
