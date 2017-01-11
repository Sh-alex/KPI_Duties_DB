import * as aTypes from '../constants/occupCodesLists'

const initialState = {
    DKHPCodesList: {
        isFetching: false,
        fetchingError: "",
        isAddingNewVal: false,
        addingErrors: [],
        addingSuccess: false,
        isUpdatingVal: false,
        updatingSuccess: false,
        updatingError: null,
        resultsOveralSize: 0,
        items : [],
    },
    ETDKCodesList: {
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
        items : [],
    },
    ZKPPTRCodesList: {
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
        items : [],
    },
    KPCodesList: {
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
        items : [],
    }
};

export default function occupCodesList(state = initialState, action) {
    switch (action.type) {
        case aTypes.FETCH_DKHP_CODES_LIST_REQUEST:
            return {
                ...state,
                DKHPCodesList: {
                    ...state.DKHPCodesList,
                    isFetching: true,
                    fetchingError: ""
                }
            };
        case aTypes.FETCH_DKHP_CODES_LIST_SUCCESS:
            return {
                ...state,
                DKHPCodesList: {
                    items: action.data,
                    resultsOveralSize: action.resultsOveralSize,
                    isFetching: false,
                    fetchingError: ""
                }
            };
        case aTypes.FETCH_DKHP_CODES_LIST_FAIL:
            return {
                ...state,
                DKHPCodesList: {
                    ...state.DKHPCodesList,
                    isFetching: false,
                    fetchingError: action.error
                }
            };

        case aTypes.FETCH_ETDK_CODES_LIST_REQUEST:
            return {
                ...state,
                ETDKCodesList: {
                    ...state.ETDKCodesList,
                    isFetching: true,
                    fetchingError: ""
                }
            };
        case aTypes.FETCH_ETDK_CODES_LIST_SUCCESS:
            return {
                ...state,
                ETDKCodesList: {
                    items: action.data,
                    resultsOveralSize: action.resultsOveralSize,
                    isFetching: false,
                    fetchingError: ""
                }
            };
        case aTypes.FETCH_ETDK_CODES_LIST_FAIL:
            return {
                ...state,
                ETDKCodesList: {
                    ...state.ETDKCodesList,
                    isFetching: false,
                    fetchingError: action.error
                }
            };

        case aTypes.FETCH_ZKPPTR_CODES_LIST_REQUEST:
            return {
                ...state,
                ZKPPTRCodesList: {
                    ...state.ZKPPTRCodesList,
                    isFetching: true,
                    fetchingError: ""
                }
            };
        case aTypes.FETCH_ZKPPTR_CODES_LIST_SUCCESS:
            return {
                ...state,
                ZKPPTRCodesList: {
                    items: action.data,
                    resultsOveralSize: action.resultsOveralSize,
                    isFetching: false,
                    fetchingError: ""
                }
            };
        case aTypes.FETCH_ZKPPTR_CODES_LIST_FAIL:
            return {
                ...state,
                ZKPPTRCodesList: {
                    ...state.ZKPPTRCodesList,
                    isFetching: false,
                    fetchingError: action.error
                }
            };

        case aTypes.FETCH_KP_CODES_LIST_REQUEST:
            return {
                ...state,
                KPCodesList: {
                    ...state.KPCodesList,
                    isFetching: true,
                    fetchingError: ""
                }
            };
        case aTypes.FETCH_KP_CODES_LIST_SUCCESS:
            return {
                ...state,
                KPCodesList: {
                    items: action.data,
                    resultsOveralSize: action.resultsOveralSize,
                    isFetching: false,
                    fetchingError: ""
                }
            };
        case aTypes.FETCH_KP_CODES_LIST_FAIL:
            return {
                ...state,
                KPCodesList: {
                    ...state.KPCodesList,
                    isFetching: false,
                    fetchingError: action.error
                }
            };


        case aTypes.ADD_NEW_KP_CODE_REQUEST:
            return {
                ...state,
                KPCodesList: {
                    ...state.KPCodesList,
                    isAddingNewVal: true,
                    addingSuccess: false,
                    addingErrors: []
                }
            };
        case aTypes.ADD_NEW_KP_CODE_SUCCESS:
            return {
                ...state,
                KPCodesList: {
                    ...state.KPCodesList,
                    items: [...state.KPCodesList.items, action.newItem],
                    isAddingNewVal: false,
                    addingSuccess: true,
                    addingErrors: []
                }
            };
        case aTypes.ADD_NEW_KP_CODE_FAIL:
            return {
                ...state,
                KPCodesList: {
                    ...state.KPCodesList,
                    isAddingNewVal: false,
                    addingSuccess: false,
                    addingErrors: [...state.KPCodesList.addingErrors, action.error]
                }
            };
        case aTypes.ADD_NEW_KP_CODE_CLEAR_MSG:
            return {
                ...state,
                KPCodesList: {
                    ...state.KPCodesList,
                    addingSuccess: false,
                    addingErrors: []
                }
            };

        case aTypes.ADD_NEW_DKHP_CODE_REQUEST:
            return {
                ...state,
                DKHPCodesList: {
                    ...state.DKHPCodesList,
                    isAddingNewVal: true,
                    addingSuccess: false,
                    addingErrors: []
                }
            };
        case aTypes.ADD_NEW_DKHP_CODE_SUCCESS:
            return {
                ...state,
                DKHPCodesList: {
                    ...state.DKHPCodesList,
                    items: [...state.DKHPCodesList.items, action.newItem],
                    isAddingNewVal: false,
                    addingSuccess: true,
                    addingErrors: []
                }
            };
        case aTypes.ADD_NEW_DKHP_CODE_FAIL:
            return {
                ...state,
                DKHPCodesList: {
                    ...state.DKHPCodesList,
                    isAddingNewVal: false,
                    addingSuccess: false,
                    addingErrors: [...state.DKHPCodesList.addingErrors, action.error]
                }
            };
        case aTypes.ADD_NEW_DKHP_CODE_CLEAR_MSG:
            return {
                ...state,
                DKHPCodesList: {
                    ...state.DKHPCodesList,
                    addingSuccess: false,
                    addingErrors: []
                }
            };

        case aTypes.ADD_NEW_ETDK_CODE_REQUEST:
            return {
                ...state,
                ETDKCodesList: {
                    ...state.ETDKCodesList,
                    isAddingNewVal: true,
                    addingSuccess: false,
                    addingErrors: []
                }
            };
        case aTypes.ADD_NEW_ETDK_CODE_SUCCESS:
            return {
                ...state,
                ETDKCodesList: {
                    ...state.ETDKCodesList,
                    items: [...state.ETDKCodesList.items, action.newItem],
                    isAddingNewVal: false,
                    addingSuccess: true,
                    addingErrors: []
                }
            };
        case aTypes.ADD_NEW_ETDK_CODE_FAIL:
            return {
                ...state,
                ETDKCodesList: {
                    ...state.ETDKCodesList,
                    isAddingNewVal: false,
                    addingSuccess: false,
                    addingErrors: [...state.ETDKCodesList.addingErrors, action.error]
                }
            };
        case aTypes.ADD_NEW_ETDK_CODE_CLEAR_MSG:
            return {
                ...state,
                ETDKCodesList: {
                    ...state.ETDKCodesList,
                    addingSuccess: false,
                    addingErrors: []
                }
            };

        case aTypes.ADD_NEW_ZKPPTR_CODE_REQUEST:
            return {
                ...state,
                ZKPPTRCodesList: {
                    ...state.ZKPPTRCodesList,
                    isAddingNewVal: true,
                    addingSuccess: false,
                    addingErrors: []
                }
            };
        case aTypes.ADD_NEW_ZKPPTR_CODE_SUCCESS:
            return {
                ...state,
                ZKPPTRCodesList: {
                    ...state.ZKPPTRCodesList,
                    items: [...state.ZKPPTRCodesList.items, action.newItem],
                    isAddingNewVal: false,
                    addingSuccess: true,
                    addingErrors: []
                }
            };
        case aTypes.ADD_NEW_ZKPPTR_CODE_FAIL:
            return {
                ...state,
                ZKPPTRCodesList: {
                    ...state.ZKPPTRCodesList,
                    isAddingNewVal: false,
                    addingSuccess: false,
                    addingErrors: [...state.ZKPPTRCodesList.addingErrors, action.error]
                }
            };

        case aTypes.ADD_NEW_ZKPPTR_CODE_CLEAR_MSG:
            return {
                ...state,
                ZKPPTRCodesList: {
                    ...state.ZKPPTRCodesList,
                    addingSuccess: false,
                    addingErrors: []
                }
            };


        case aTypes.EDIT_KP_CODE_REQUEST:
            return {
                ...state,
                KPCodesList: {
                    ...state.KPCodesList,
                    isUpdatingVal: true,
                    updatingSuccess: false,
                    updatingError: null
                }
            };
        case aTypes.EDIT_KP_CODE_SUCCESS:
            return {
                ...state,
                KPCodesList: {
                    ...state.KPCodesList,
                    items: state.KPCodesList.items.map(item => {
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
        case aTypes.EDIT_KP_CODE_FAIL:
            return {
                ...state,
                KPCodesList: {
                    ...state.KPCodesList,
                    isUpdatingVal: false,
                    updatingSuccess: false,
                    updatingError: action.error
                }
            };
        case aTypes.EDIT_KP_CODE_CLEAR_MSG:
            return {
                ...state,
                KPCodesList: {
                    ...state.KPCodesList,
                    updatingSuccess: false,
                    updatingError: null
                }
            };

        case aTypes.EDIT_DKHP_CODE_REQUEST:
            return {
                ...state,
                DKHPCodesList: {
                    ...state.DKHPCodesList,
                    isUpdatingVal: true,
                    updatingSuccess: false,
                    updatingError: null
                }
            };
        case aTypes.EDIT_DKHP_CODE_SUCCESS:
            return {
                ...state,
                DKHPCodesList: {
                    ...state.DKHPCodesList,
                    items: state.DKHPCodesList.items.map(item => {
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
        case aTypes.EDIT_DKHP_CODE_FAIL:
            return {
                ...state,
                DKHPCodesList: {
                    ...state.DKHPCodesList,
                    isUpdatingVal: false,
                    updatingSuccess: false,
                    updatingError: action.error
                }
            };
        case aTypes.EDIT_DKHP_CODE_CLEAR_MSG:
            return {
                ...state,
                DKHPCodesList: {
                    ...state.DKHPCodesList,
                    updatingSuccess: false,
                    updatingError: null
                }
            };

        case aTypes.EDIT_ETDK_CODE_REQUEST:
            return {
                ...state,
                ETDKCodesList: {
                    ...state.ETDKCodesList,
                    isUpdatingVal: true,
                    updatingSuccess: false,
                    updatingError: null
                }
            };
        case aTypes.EDIT_ETDK_CODE_SUCCESS:
            return {
                ...state,
                ETDKCodesList: {
                    ...state.ETDKCodesList,
                    items: state.ETDKCodesList.items.map(item => {
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
        case aTypes.EDIT_ETDK_CODE_FAIL:
            return {
                ...state,
                ETDKCodesList: {
                    ...state.ETDKCodesList,
                    isUpdatingVal: false,
                    updatingSuccess: false,
                    updatingError: action.error
                }
            };
        case aTypes.EDIT_ETDK_CODE_CLEAR_MSG:
            return {
                ...state,
                ETDKCodesList: {
                    ...state.ETDKCodesList,
                    updatingSuccess: false,
                    updatingError: null
                }
            };

        case aTypes.EDIT_ZKPPTR_CODE_REQUEST:
            return {
                ...state,
                ZKPPTRCodesList: {
                    ...state.ZKPPTRCodesList,
                    isUpdatingVal: true,
                    updatingSuccess: false,
                    updatingError: null
                }
            };
        case aTypes.EDIT_ZKPPTR_CODE_SUCCESS:
            return {
                ...state,
                ZKPPTRCodesList: {
                    ...state.ZKPPTRCodesList,
                    items: state.ZKPPTRCodesList.items.map(item => {
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
        case aTypes.EDIT_ZKPPTR_CODE_FAIL:
            return {
                ...state,
                ZKPPTRCodesList: {
                    ...state.ZKPPTRCodesList,
                    isUpdatingVal: false,
                    updatingSuccess: false,
                    updatingError: action.error
                }
            };

        case aTypes.EDIT_ZKPPTR_CODE_CLEAR_MSG:
            return {
                ...state,
                ZKPPTRCodesList: {
                    ...state.ZKPPTRCodesList,
                    updatingSuccess: false,
                    updatingError: null
                }
            };


        case aTypes.DEL_KP_CODE_REQUEST:
            return {
                ...state,
                KPCodesList: {
                    ...state.KPCodesList,
                    isDeletingVal: true,
                    deletingSuccess: false,
                    deletingError: null
                }
            };
        case aTypes.DEL_KP_CODE_SUCCESS:
            let newKPCodesList = state.KPCodesList.items.slice(),
                deletedItemIndex = newKPCodesList.findIndex(item => item.id === action.id);
            newKPCodesList.splice(deletedItemIndex, 1);
            return {
                ...state,
                KPCodesList: {
                    ...state.KPCodesList,
                    items: newKPCodesList,
                    isDeletingVal: false,
                    deletingSuccess: true,
                    deletingError: null
                }
            };
        case aTypes.DEL_KP_CODE_FAIL:
            return {
                ...state,
                KPCodesList: {
                    ...state.KPCodesList,
                    isDeletingVal: false,
                    deletingSuccess: false,
                    deletingError: action.error
                }
            };
        case aTypes.DEL_KP_CODE_CLEAR_MSG:
            return {
                ...state,
                KPCodesList: {
                    ...state.KPCodesList,
                    deletingSuccess: false,
                    deletingError: null
                }
            };

        case aTypes.DEL_DKHP_CODE_REQUEST:
            return {
                ...state,
                DKHPCodesList: {
                    ...state.DKHPCodesList,
                    isDeletingVal: true,
                    deletingSuccess: false,
                    deletingError: null
                }
            };
        case aTypes.DEL_DKHP_CODE_SUCCESS:
            let newDKHPCodesList = state.DKHPCodesList.items.slice(),
                deletedItemIndex2 = newDKHPCodesList.findIndex(item => item.id === action.id);
            newDKHPCodesList.splice(deletedItemIndex2, 1);
            return {
                ...state,
                DKHPCodesList: {
                    ...state.DKHPCodesList,
                    items: newDKHPCodesList,
                    isDeletingVal: false,
                    deletingSuccess: true,
                    deletingError: null
                }
            };
        case aTypes.DEL_DKHP_CODE_FAIL:
            return {
                ...state,
                DKHPCodesList: {
                    ...state.DKHPCodesList,
                    isDeletingVal: false,
                    deletingSuccess: false,
                    deletingError: action.error
                }
            };
        case aTypes.DEL_DKHP_CODE_CLEAR_MSG:
            return {
                ...state,
                DKHPCodesList: {
                    ...state.DKHPCodesList,
                    deletingSuccess: false,
                    deletingError: null
                }
            };

        case aTypes.DEL_ETDK_CODE_REQUEST:
            return {
                ...state,
                ETDKCodesList: {
                    ...state.ETDKCodesList,
                    isDeletingVal: true,
                    deletingSuccess: false,
                    deletingError: null
                }
            };
        case aTypes.DEL_ETDK_CODE_SUCCESS:
            let newETDKCodesList = state.ETDKCodesList.items.slice(),
                deletedItemIndex3 = newETDKCodesList.findIndex(item => item.id === action.id);
            newETDKCodesList.splice(deletedItemIndex3, 1);
            return {
                ...state,
                ETDKCodesList: {
                    ...state.ETDKCodesList,
                    items: newETDKCodesList,
                    isDeletingVal: false,
                    deletingSuccess: true,
                    deletingError: null
                }
            };
        case aTypes.DEL_ETDK_CODE_FAIL:
            return {
                ...state,
                ETDKCodesList: {
                    ...state.ETDKCodesList,
                    isDeletingVal: false,
                    deletingSuccess: false,
                    deletingError: action.error
                }
            };
        case aTypes.DEL_ETDK_CODE_CLEAR_MSG:
            return {
                ...state,
                ETDKCodesList: {
                    ...state.ETDKCodesList,
                    deletingSuccess: false,
                    deletingError: null
                }
            };

        case aTypes.DEL_ZKPPTR_CODE_REQUEST:
            return {
                ...state,
                ZKPPTRCodesList: {
                    ...state.ZKPPTRCodesList,
                    isDeletingVal: true,
                    deletingSuccess: false,
                    deletingError: null
                }
            };
        case aTypes.DEL_ZKPPTR_CODE_SUCCESS:
            let newZKPPTRCodesList = state.ZKPPTRCodesList.items.slice(),
                deletedItemIndex4 = newZKPPTRCodesList.findIndex(item => item.id === action.id);
            newZKPPTRCodesList.splice(deletedItemIndex4, 1);
            return {
                ...state,
                ZKPPTRCodesList: {
                    ...state.ZKPPTRCodesList,
                    items: newZKPPTRCodesList,
                    isDeletingVal: false,
                    deletingSuccess: true,
                    deletingError: null
                }
            };
        case aTypes.DEL_ZKPPTR_CODE_FAIL:
            return {
                ...state,
                ZKPPTRCodesList: {
                    ...state.ZKPPTRCodesList,
                    isDeletingVal: false,
                    deletingSuccess: false,
                    deletingError: action.error
                }
            };

        case aTypes.DEL_ZKPPTR_CODE_CLEAR_MSG:
            return {
                ...state,
                ZKPPTRCodesList: {
                    ...state.ZKPPTRCodesList,
                    deletingSuccess: false,
                    deletingError: null
                }
            };


        default:
            return state
    }
}
