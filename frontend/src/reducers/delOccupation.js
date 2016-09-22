import {
    DEL_OCCUP_REQUEST,
    DEL_OCCUP_FAIL,
    DEL_OCCUP_SUCCESS,
    DISMISS_DEL_OCCUP_ALERT
} from '../constants/delOccupation'

const initialState = {
    delOccupationError: null,
    delOccupationSuccess: false,
    isDeletingOccupation: false,
};

export default function (state = initialState, action) {
    switch(action.type) {
        case DEL_OCCUP_REQUEST:
            return {
                ...state,
                delOccupationError: null,
                delOccupationSuccess: false,
                isDeletingOccupation: true,
            };
        case DEL_OCCUP_SUCCESS:
            return {
                ...state,
                delOccupationError: null,
                delOccupationSuccess: true,
                isDeletingOccupation: false
            };
        case DEL_OCCUP_FAIL:
            return {
                ...state,
                isDeletingOccupation: false,
                delOccupationSuccess: false,
                delOccupationError: action.error,
            };

        case DISMISS_DEL_OCCUP_ALERT:
            return {
                ...state,
                delOccupationError: null,
                delOccupationSuccess: false
            };
        default:
            return state;
    }
}