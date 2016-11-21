import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from '../constants/user'

const initialState = {
    isAuthenticated: false,
    isLoggingIn: false,
    //loginSuccess: false,      поки що не треба, бо там просто міняються блоки, в залежності від isAuthenticated
    loginError: "",
    isLoggingOut: false,
    //logoutSuccess: false,
    logoutError: "",
    userName: "",
    userAvatar: "",
    role: "guest",
    permissions: {/**/}
}; //JSON.parse(window.localStorage.getItem('rr_user')) || {}

export default function userstate(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                isAuthenticated: false,
                isLoggingIn: true,
                isLoggingOut: false,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isLoggingIn: false,
                ...action.userInfo
            };
        case LOGIN_FAIL:
            return {
                isAuthenticated: false,
                isLoggingIn: false,
                loginError: action.errorMsg,
                permissions: {}
            };

        case LOGOUT_SUCCESS:
            return {
                isAuthenticated: false,
                isLoggingIn: false,
                loginError: "",
                isLoggingOut: false,
                logoutError: "",
                userName: "",
                userAvatar: "",
                role: "guest",
                permissions: {/**/}
            };

        default:
            return state
    }
}
