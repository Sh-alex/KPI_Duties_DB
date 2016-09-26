import {
    HIDE_MODAL_EDIT_OCCUP,
    SHOW_MODAL_EDIT_OCCUP,
} from '../constants/modalEditOccup'

const initialState = {
    show: false,
    editingData: null,
};

export default function (state = initialState, action) {
    switch(action.type) {
        case SHOW_MODAL_EDIT_OCCUP:
            return {
                show: true,
                editingData: action.editingData,
            };
        case HIDE_MODAL_EDIT_OCCUP:
            return {
                ...state,
                show: false,
                editingData: null,
            };
        default:
            return state;
    }
}