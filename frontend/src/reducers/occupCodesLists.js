import * as aTypes from '../constants/occupCodesLists'

const initialState = {
    DKHPCodesList: {
        isFetching: false,
        errors: [],
        isAddingNewVal: false,
        addingErrors: [],
        addingSuccess: false,
        isUpdatingVal: false,
        updatingSuccess: false,
        updatingError: null,
        items : [],
        // items : [
        //     {
        //         "id": 0,
        //         "textValue": "ergerg"
        //     },
        //     {
        //         "id": 1,
        //         "textValue": "k87k7"
        //     },
        //     {
        //         "id": 2,
        //         "textValue": "4545t"
        //     },
        //     {
        //         "id": 3,
        //         "textValue": "gergerg"
        //     },
        //     {
        //         "id": 4,
        //         "textValue": "hgfdfg"
        //     }
        // ]
    },
    ETDKCodesList: {
        isFetching: false,
        errors: [],
        isAddingNewVal: false,
        addingErrors: [],
        addingSuccess: false,
        isUpdatingVal: false,
        updatingSuccess: false,
        updatingError: null,
        items : [],
        // items : [
        //     {
        //         "id": 0,
        //         "textValue": "hgtr4"
        //     },
        //     {
        //         "id": 1,
        //         "textValue": "73247j"
        //     },
        //     {
        //         "id": 2,
        //         "textValue": "567j67yj"
        //     },
        //     {
        //         "id": 3,
        //         "textValue": "yhj5"
        //     },
        //     {
        //         "id": 4,
        //         "textValue": "k87kkrfe"
        //     }
        // ]
    },
    ZKPPTRCodesList: {
        isFetching: false,
        errors: [],
        isAddingNewVal: false,
        addingErrors: [],
        addingSuccess: false,
        isUpdatingVal: false,
        updatingSuccess: false,
        updatingError: null,
        items : [],
        // items : [
        //     {
        //         "id": 0,
        //         "textValue": "egrg"
        //     },
        //     {
        //         "id": 1,
        //         "textValue": "5656h56h"
        //     },
        //     {
        //         "id": 2,
        //         "textValue": "7h56h5"
        //     },
        //     {
        //         "id": 3,
        //         "textValue": "123f3"
        //     },
        //     {
        //         "id": 4,
        //         "textValue": "9ol879lk"
        //     }
        // ]
    },
    KPCodesList: {
        isFetching: false,
        errors: [],
        isAddingNewVal: false,
        addingErrors: [],
        addingSuccess: false,
        isUpdatingVal: false,
        updatingSuccess: false,
        updatingError: null,
        items : [],
        // items : [
        //     {
        //         "id": 0,
        //         "textValue": "egrg"
        //     },
        //     {
        //         "id": 1,
        //         "textValue": "5656h56h"
        //     },
        //     {
        //         "id": 2,
        //         "textValue": "2f3ff"
        //     },
        //     {
        //         "id": 3,
        //         "textValue": "123f3"
        //     },
        //     {
        //         "id": 4,
        //         "textValue": "9ol879lk"
        //     }
        // ]
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
                    errors: []
                }
            };
        case aTypes.FETCH_DKHP_CODES_LIST_SUCCESS:
            return {
                ...state,
                DKHPCodesList: {
                    items: action.data,
                    isFetching: false,
                    errors: []
                }
            };
        case aTypes.FETCH_DKHP_CODES_LIST_FAIL:
            return {
                ...state,
                DKHPCodesList: {
                    ...state.DKHPCodesList,
                    isFetching: false,
                    errors: [...state.DKHPCodesList.errors, action.error]
                }
            };

        case aTypes.FETCH_ETDK_CODES_LIST_REQUEST:
            return {
                ...state,
                ETDKCodesList: {
                    ...state.ETDKCodesList,
                    isFetching: true,
                    errors: []
                }
            };
        case aTypes.FETCH_ETDK_CODES_LIST_SUCCESS:
            return {
                ...state,
                ETDKCodesList: {
                    items: action.data,
                    isFetching: false,
                    errors: []
                }
            };
        case aTypes.FETCH_ETDK_CODES_LIST_FAIL:
            return {
                ...state,
                ETDKCodesList: {
                    ...state.ETDKCodesList,
                    isFetching: false,
                    errors: [...state.ETDKCodesList.errors, action.error]
                }
            };

        case aTypes.FETCH_ZKPPTR_CODES_LIST_REQUEST:
            return {
                ...state,
                ZKPPTRCodesList: {
                    ...state.ZKPPTRCodesList,
                    isFetching: true,
                    errors: []
                }
            };
        case aTypes.FETCH_ZKPPTR_CODES_LIST_SUCCESS:
            return {
                ...state,
                ZKPPTRCodesList: {
                    items: action.data,
                    isFetching: false,
                    errors: []
                }
            };
        case aTypes.FETCH_ZKPPTR_CODES_LIST_FAIL:
            return {
                ...state,
                ZKPPTRCodesList: {
                    ...state.ZKPPTRCodesList,
                    isFetching: false,
                    errors: [...state.ZKPPTRCodesList.errors, action.error]
                }
            };

        case aTypes.FETCH_KP_CODES_LIST_REQUEST:
            return {
                ...state,
                KPCodesList: {
                    ...state.KPCodesList,
                    isFetching: true,
                    errors: []
                }
            };
        case aTypes.FETCH_KP_CODES_LIST_SUCCESS:
            return {
                ...state,
                KPCodesList: {
                    items: action.data,
                    isFetching: false,
                    errors: []
                }
            };
        case aTypes.FETCH_KP_CODES_LIST_FAIL:
            return {
                ...state,
                KPCodesList: {
                    ...state.KPCodesList,
                    isFetching: false,
                    errors: [...state.KPCodesList.errors, action.error]
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

        default:
            return state
    }
}
