import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,

    LOGOUT_SUCCESS,

    GET_USER_INFO_REQUEST,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_FAIL,

    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAIL,

    CLEAR_LOG_IN_ERROR,

    DENY_ACCESS_TO_THE_USER,
} from '../constants/user'

const initialState = {
    isAuthenticated: false,
    isLoggingIn: false,
    isGettingUserInfo: false,
    getUserInfoError: "",
    isRefreshingAccessToken: false,
    refreshingAccessTokenError: "",
    access_token: "",
    //loginSuccess: false,      поки що не треба, бо там просто міняються блоки, в залежності від isAuthenticated
    loginError: "",
    // isLoggingOut: false,
    // logoutSuccess: false,
    // logoutError: "",
    userName: "",
    userAvatar: "",
    accessError: "",
    permissions: {
        "accessName": "Доступ заборонено",
        "forms": { }
    },
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case GET_USER_INFO_REQUEST:
            return {
                ...state,
                permissions: {
                    "accessName": "Доступ заборонено",
                    "forms": { }
                },
                isAuthenticated: false,
                getUserInfoError: "",
                accessError: "",
                isGettingUserInfo: true,
            };
        case GET_USER_INFO_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                getUserInfoError: "",
                isGettingUserInfo: false,
                ...action.response
            };
        case GET_USER_INFO_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                isGettingUserInfo: false,
                getUserInfoError: action.errorMsg,
                permissions: {
                    "accessName": "Доступ заборонено",
                    "forms": { }
                },
            };

        case LOGIN_REQUEST:
            return {
                ...state,
                loginError: "",
                accessError: "",
                isAuthenticated: false,
                isLoggingIn: true,
                permissions: {
                    "accessName": "Доступ заборонено",
                    "forms": { }
                },
                access_token: ""
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                //isAuthenticated: true,    поки що ставимо isAuthenticated: true лише коли отримано інформацію про користвача
                loginError: "",
                isLoggingIn: false,
                access_token: action.response.access_token
            };
        case LOGIN_FAIL:
            return {
                isAuthenticated: false,
                isLoggingIn: false,
                loginError: action.errorMsg,
                access_token: "",
                permissions: {
                    "accessName": "Доступ заборонено",
                    "forms": { }
                },
            };

        case LOGOUT_SUCCESS:
            return {
                isAuthenticated: false,
                isLoggingIn: false,
                loginError: "",
                accessError: "",
                // isLoggingOut: false,
                // logoutError: "",
                access_token: "",
                userName: "",
                userAvatar: "",
                permissions: {
                    "accessName": "Доступ заборонено",
                    "forms": { }
                },
            };

        case CLEAR_LOG_IN_ERROR:
            return {
                ...state,
                loginError: "",
                getUserInfoError: "",
                accessError: "",
            };

        case REFRESH_TOKEN_REQUEST:
            return {
                ...state,
                isRefreshingAccessToken: true,
                refreshingAccessTokenError: "",
            };
        case REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                isRefreshingAccessToken: false,
                refreshingAccessTokenError: "",
                access_token: action.response.access_token,
            };
        case REFRESH_TOKEN_FAIL:
            return {
                ...state,
                isRefreshingAccessToken: false,
                access_token: "",
                refreshingAccessTokenError: action.errorMsg,
            };

        case DENY_ACCESS_TO_THE_USER:
            return {
                ...state,
                accessError: "Відмовлено в доступі до цього компоненту.",
            };

        default:
            return state
    }
}
