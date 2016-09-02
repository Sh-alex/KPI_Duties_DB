import * as aTypes from '../constants/occupCodesLists'

const initialState = {
    DKHPCodesList: {
        isFetching: false,
        isAddingNewVal: false,
        addingErrors: [],
        errors: [],
        // items : []
        items : [
            {
                "id": 0,
                "textValue": "ergerg"
            },
            {
                "id": 1,
                "textValue": "k87k7"
            },
            {
                "id": 2,
                "textValue": "4545t"
            },
            {
                "id": 3,
                "textValue": "gergerg"
            },
            {
                "id": 4,
                "textValue": "hgfdfg"
            }
        ]
    },
    ETDKCodesList: {
        isFetching: false,
        isAddingNewVal: false,
        addingErrors: [],
        errors: [],
        // items : []
        items : [
            {
                "id": 0,
                "textValue": "hgtr4"
            },
            {
                "id": 1,
                "textValue": "73247j"
            },
            {
                "id": 2,
                "textValue": "567j67yj"
            },
            {
                "id": 3,
                "textValue": "yhj5"
            },
            {
                "id": 4,
                "textValue": "k87kkrfe"
            }
        ]
    },
    ZKPPTRCodesList: {
        isFetching: false,
        isAddingNewVal: false,
        addingErrors: [],
        errors: [],
        //      items : []
        items : [
            {
                "id": 0,
                "textValue": "egrg"
            },
            {
                "id": 1,
                "textValue": "5656h56h"
            },
            {
                "id": 2,
                "textValue": "7h56h5"
            },
            {
                "id": 3,
                "textValue": "123f3"
            },
            {
                "id": 4,
                "textValue": "9ol879lk"
            }
        ]
    },
    KPCodesList: {
        isFetching: false,
        isAddingNewVal: false,
        addingErrors: [],
        errors: [],
        //      items : []
        items : [
            {
                "id": 0,
                "textValue": "egrg"
            },
            {
                "id": 1,
                "textValue": "5656h56h"
            },
            {
                "id": 2,
                "textValue": "2f3ff"
            },
            {
                "id": 3,
                "textValue": "123f3"
            },
            {
                "id": 4,
                "textValue": "9ol879lk"
            }
        ]
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
                    addingErrors: []
                }
            };
        case aTypes.ADD_NEW_KP_CODE_SUCCESS:
            return {
                ...state,
                clarificationList: {
                    ...state.KPCodesList,
                    items: [...state.KPCodesList.items, action.newItem],
                    isAddingNewVal: false,
                    addingErrors: []
                }
            };
        case aTypes.ADD_NEW_KP_CODE_FAIL:
            return {
                ...state,
                KPCodesList: {
                    ...state.KPCodesList,
                    isAddingNewVal: false,
                    addingErrors: [...state.KPCodesList.addingErrors, action.error]
                }
            };
        case aTypes.ADD_NEW_KP_CODE_CLEAR_ERROR:
            return {
                ...state,
                KPCodesList: {
                    ...state.KPCodesList,
                    addingErrors: []
                }
            };

        case aTypes.ADD_NEW_DKHP_CODE_REQUEST:
            return {
                ...state,
                DKHPCodesList: {
                    ...state.DKHPCodesList,
                    isAddingNewVal: true,
                    addingErrors: []
                }
            };
        case aTypes.ADD_NEW_DKHP_CODE_SUCCESS:
            return {
                ...state,
                clarificationList: {
                    ...state.DKHPCodesList,
                    items: [...state.DKHPCodesList.items, action.newItem],
                    isAddingNewVal: false,
                    addingErrors: []
                }
            };
        case aTypes.ADD_NEW_DKHP_CODE_FAIL:
            return {
                ...state,
                DKHPCodesList: {
                    ...state.DKHPCodesList,
                    isAddingNewVal: false,
                    addingErrors: [...state.DKHPCodesList.addingErrors, action.error]
                }
            };
        case aTypes.ADD_NEW_DKHP_CODE_CLEAR_ERROR:
            return {
                ...state,
                DKHPCodesList: {
                    ...state.DKHPCodesList,
                    addingErrors: []
                }
            };

        case aTypes.ADD_NEW_ETDK_CODE_REQUEST:
            return {
                ...state,
                ETDKCodesList: {
                    ...state.ETDKCodesList,
                    isAddingNewVal: true,
                    addingErrors: []
                }
            };
        case aTypes.ADD_NEW_ETDK_CODE_SUCCESS:
            return {
                ...state,
                clarificationList: {
                    ...state.ETDKCodesList,
                    items: [...state.ETDKCodesList.items, action.newItem],
                    isAddingNewVal: false,
                    addingErrors: []
                }
            };
        case aTypes.ADD_NEW_ETDK_CODE_FAIL:
            return {
                ...state,
                ETDKCodesList: {
                    ...state.ETDKCodesList,
                    isAddingNewVal: false,
                    addingErrors: [...state.ETDKCodesList.addingErrors, action.error]
                }
            };
        case aTypes.ADD_NEW_ETDK_CODE_CLEAR_ERROR:
            return {
                ...state,
                ETDKCodesList: {
                    ...state.ETDKCodesList,
                    addingErrors: []
                }
            };

        case aTypes.ADD_NEW_ZKPPTR_CODE_REQUEST:
            return {
                ...state,
                ZKPPTRCodesList: {
                    ...state.ZKPPTRCodesList,
                    isAddingNewVal: true,
                    addingErrors: []
                }
            };
        case aTypes.ADD_NEW_ZKPPTR_CODE_SUCCESS:
            return {
                ...state,
                clarificationList: {
                    ...state.ZKPPTRCodesList,
                    items: [...state.ZKPPTRCodesList.items, action.newItem],
                    isAddingNewVal: false,
                    addingErrors: []
                }
            };
        case aTypes.ADD_NEW_ZKPPTR_CODE_FAIL:
            return {
                ...state,
                ZKPPTRCodesList: {
                    ...state.ZKPPTRCodesList,
                    isAddingNewVal: false,
                    addingErrors: [...state.ZKPPTRCodesList.addingErrors, action.error]
                }
            };

        case aTypes.ADD_NEW_ZKPPTR_CODE_CLEAR_ERROR:
            return {
                ...state,
                ZKPPTRCodesList: {
                    ...state.ZKPPTRCodesList,
                    addingErrors: []
                }
            };

        default:
            return state
    }
}
