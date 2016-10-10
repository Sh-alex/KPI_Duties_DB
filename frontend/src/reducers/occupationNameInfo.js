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
} from '../constants/occupationNameInfo'

const initialState = {
    occupationGroupList: {
        isFetching: false,
        errors: [],
        items : []
        // items : [
        //     {
        //         "id": 0,
        //         "textValue": "Керівники"
        //     },
        //     {
        //         "id": 1,
        //         "textValue": "Професіонали"
        //     },
        //     {
        //         "id": 2,
        //         "textValue": "Фахівці"
        //     },
        //     {
        //         "id": 3,
        //         "textValue": "Технічні службовці"
        //     },
        //     {
        //         "id": 4,
        //         "textValue": "Найпростіші професії"
        //     }
        // ],
    },
    clarifiedOccupationList: {
        isFetching: false,
        errors: [],
        items : []
        // items : [
        //     {
        //         "id": -1,
        //         "textValue": "-(Відсутня)-"
        //     },
        //     {
        //         "id": 0,
        //         "textValue": "Інженер"
        //     },
        //     {
        //         "id": 1,
        //         "textValue": "Інженер молодший"
        //     },
        //     {
        //         "id": 2,
        //         "textValue": "Інженер старший 1 категорії"
        //     },
        //     {
        //         "id": 3,
        //         "textValue": "Директор"
        //     },
        //     {
        //         "id": 4,
        //         "textValue": "Посол"
        //     },
        //     {
        //         "id": 5,
        //         "textValue": "Фрезерувальник"
        //     }
        // ]
    },
    clarificationList: {
        isFetching: false,
        isAddingNewVal: false,
        addingErrors: [],
        addingSuccess: false,
        errors: [],
        items : []
        // items : [
        //     {
        //         "id": 0,
        //         "textValue": "Патімейкер"
        //     },
        //     {
        //         "id": 1,
        //         "textValue": "Молодший"
        //     },
        //     {
        //         "id": 2,
        //         "textValue": "Замістник"
        //     },
        //     {
        //         "id": 3,
        //         "textValue": "Старший"
        //     },
        //     {
        //         "id": 4,
        //         "textValue": "1 категорії"
        //     },
        //     {
        //         "id": 5,
        //         "textValue": "3 розряду"
        //     }
        // ]
    }
};

export default function occupationNameInfo(state = initialState, action) {
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
                    errors: []
                }
            };
        case FETCH_OCCUP_GROUP_LIST_SUCCESS:
            return {
                ...state,
                occupationGroupList: {
                    items: action.data,
                    isFetching: false,
                    errors: []
                }
            };
        case FETCH_OCCUP_GROUP_LIST_FAIL:
            return {
                ...state,
                occupationGroupList: {
                    ...state.occupationGroupList,
                    isFetching: false,
                    errors: [...state.occupationGroupList.errors, action.error]
                }
            };

        case FETCH_CLARIFICATION_LIST_REQUEST:
            return {
                ...state,
                clarificationList: {
                    ...state.clarificationList,
                    isFetching: true,
                    errors: []
                }
            };
        case FETCH_CLARIFICATION_LIST_SUCCESS:
            return {
                ...state,
                clarificationList: {
                    items: action.data,
                    isFetching: false,
                    errors: []
                }
            };
        case FETCH_CLARIFICATION_LIST_FAIL:
            return {
                ...state,
                clarificationList: {
                    ...state.clarificationList,
                    isFetching: false,
                    errors: [...state.clarificationList.errors, action.error]
                }
            };

        case FETCH_CLARIFIED_OCCUP_LIST_REQUEST:
            return {
                ...state,
                clarifiedOccupationList: {
                    ...state.clarifiedOccupationList,
                    isFetching: true,
                    errors: []
                }
            };
        case FETCH_CLARIFIED_OCCUP_LIST_SUCCESS:
            return {
                ...state,
                clarifiedOccupationList: {
                    items: action.data,
                    isFetching: false,
                    errors: []
                }
            };
        case FETCH_CLARIFIED_OCCUP_LIST_FAIL:
            return {
                ...state,
                clarifiedOccupationList: {
                    ...state.clarifiedOccupationList,
                    isFetching: false,
                    errors: [...state.clarifiedOccupationList.errors, action.error]
                }
            };
        default:
            return state
    }
}
