import {
    HIDE_MODAL_EDIT_OCCUP,
    SHOW_MODAL_EDIT_OCCUP,

    FETCH_EDITING_OCCUP_DATA_REQUEST,
    FETCH_EDITING_OCCUP_DATA_SUCCESS,
    FETCH_EDITING_OCCUP_DATA_FAIL,
    //FETCH_EDITING_OCCUP_DATA_CLEAR_MSG,
} from '../constants/modalEditOccup'

const initialState = {
    show: false,
    isFetchingData: false,
    //fetchDataSuccess: false,
    fetchDataError: false,
    editingData: null,
};

export default function (state = initialState, action) {
    switch(action.type) {
        case SHOW_MODAL_EDIT_OCCUP:
            return {
                ...state,
                show: true,
                editingData: action.editingData,
            };
        case HIDE_MODAL_EDIT_OCCUP:
            return {
                ...state,
                show: false,
                editingData: null,
                fetchDataError: null,
                isFetchingData: true,
            };


        case FETCH_EDITING_OCCUP_DATA_REQUEST:
            return {
                ...state,
                fetchDataError: null,
                isFetchingData: true,
            };
        case FETCH_EDITING_OCCUP_DATA_SUCCESS:
            return {
                ...state,
                fetchDataError: null,
                isFetchingData: false,
                editingData: action.editingData
            };
        case FETCH_EDITING_OCCUP_DATA_FAIL:
            return {
                ...state,
                editingData: null,
                isFetchingData: false,
                fetchDataError: action.error,
            };

        // case FETCH_EDITING_OCCUP_DATA_CLEAR_MSG:
        //     return {
        //         ...state,
        //         fetchDataError: null
        //     };

        default:
            return state;
    }
}