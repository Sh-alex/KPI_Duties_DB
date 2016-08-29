import * as aTypes from '../constants/occupCodesLists'

const initialState = {
    DKHPCodesList: {
        isFetching: false,
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
        default:
            return state
    }
}
