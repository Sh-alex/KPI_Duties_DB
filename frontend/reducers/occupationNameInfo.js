import * as aTypes from '../constants/occupationNameInfo'

const initialState = {
    occupationGroupList: {
        isFetching: false,
        errors: [],
        // items : []
        items : [
            {
                "id": 0,
                "textVal": "Керівники"
            },
            {
                "id": 1,
                "textVal": "Професіонали"
            },
            {
                "id": 2,
                "textVal": "Фахівці"
            },
            {
                "id": 3,
                "textVal": "Технічні службовці"
            },
            {
                "id": 4,
                "textVal": "Найпростіші професії"
            }
        ],
    },
    clarifiedOccupationList: {
        isFetching: false,
        errors: [],
        // items : []
        items : [
            {
                "id": -1,
                "textVal": "-(Відсутня)-"
            },
            {
                "id": 0,
                "textVal": "Інженер"
            },
            {
                "id": 1,
                "textVal": "Інженер молодший"
            },
            {
                "id": 2,
                "textVal": "Інженер старший 1 категорії"
            },
            {
                "id": 3,
                "textVal": "Директор"
            },
            {
                "id": 4,
                "textVal": "Посол"
            },
            {
                "id": 5,
                "textVal": "Фрезерувальник"
            }
        ]
    },
    clarificationList: {
        isFetching: false,
        isAddingNewVal: false,
        addingErrors: [],
        errors: [],
  //      items : []
        items : [
            {
                "id": 0,
                "textVal": "Патімейкер"
            },
            {
                "id": 1,
                "textVal": "Молодший"
            },
            {
                "id": 2,
                "textVal": "Замістник"
            },
            {
                "id": 3,
                "textVal": "Старший"
            },
            {
                "id": 4,
                "textVal": "1 категорії"
            },
            {
                "id": 5,
                "textVal": "3 розряду"
            }
        ]
    }
};

export default function occupationNameInfo(state = initialState, action) {
    switch (action.type) {
        case aTypes.ADD_NEW_CLARIFICATION_REQUEST:
            return {
                ...state,
                clarificationList: {
                    ...state.clarificationList,
                    isAddingNewVal: true,
                    addingErrors: []
                }
            };
        case aTypes.ADD_NEW_CLARIFICATION_SUCCESS:
            return {
                ...state,
                clarificationList: {
                    ...state.clarificationList,
                    items: [...state.clarificationList.items, action.newItem],
                    isAddingNewVal: false,
                    addingErrors: []
                }
            };
        case aTypes.ADD_NEW_CLARIFICATION_FAIL:
            return {
                ...state,
                clarificationList: {
                    ...state.clarificationList,
                    isAddingNewVal: false,
                    addingErrors: [...state.clarificationList.addingErrors, action.error]
                }
            };

        case aTypes.DISMISS_MODAL_ADD_NEW_CLARIFICATION_ALERT:
            return {
                ...state,
                clarificationList: {
                    ...state.clarificationList,
                    addingErrors: []
                }
            };

        case aTypes.FETCH_OCCUP_GROUP_LIST_REQUEST:
            return {
                ...state,
                occupationGroupList: {
                    ...state.occupationGroupList,
                    isFetching: true,
                    errors: []
                }
            };
        case aTypes.FETCH_OCCUP_GROUP_LIST_SUCCESS:
            return {
                ...state,
                occupationGroupList: {
                    items: action.data,
                    isFetching: false,
                    errors: []
                }
            };
        case aTypes.FETCH_OCCUP_GROUP_LIST_FAIL:
            return {
                ...state,
                occupationGroupList: {
                    ...state.occupationGroupList,
                    isFetching: false,
                    errors: [...state.occupationGroupList.errors, action.error]
                }
            };

        case aTypes.FETCH_CLARIFICATION_LIST_REQUEST:
            return {
                ...state,
                clarificationList: {
                    ...state.clarificationList,
                    isFetching: true,
                    errors: []
                }
            };
        case aTypes.FETCH_CLARIFICATION_LIST_SUCCESS:
            return {
                ...state,
                clarificationList: {
                    items: action.data,
                    isFetching: false,
                    errors: []
                }
            };
        case aTypes.FETCH_CLARIFICATION_LIST_FAIL:
            return {
                ...state,
                clarificationList: {
                    ...state.clarificationList,
                    isFetching: false,
                    errors: [...state.clarificationList.errors, action.error]
                }
            };

        case aTypes.FETCH_CLARIFIED_OCCUP_LIST_REQUEST:
            return {
                ...state,
                clarifiedOccupationList: {
                    ...state.clarifiedOccupationList,
                    isFetching: true,
                    errors: []
                }
            };
        case aTypes.FETCH_CLARIFIED_OCCUP_LIST_SUCCESS:
            return {
                ...state,
                clarifiedOccupationList: {
                    items: action.data,
                    isFetching: false,
                    errors: []
                }
            };
        case aTypes.FETCH_CLARIFIED_OCCUP_LIST_FAIL:
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
