import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,

    LOGOUT_SUCCESS
} from '../constants/user'

import {
    ROUTING
} from '../constants/Routing'


/**
 * @param {Object} authData - дані авторизації користувача
 * @param {String} authData.login - логін
 * @param {String} authData.pass - пароль
 */
export function login(authData) {
    return (dispatch) => {
        dispatch({
            type: LOGIN_REQUEST,
            authData
        });

        setTimeout(() => {
            dispatch({
                type: LOGIN_SUCCESS,
                userInfo: {
                    userName: "Генаш Максим Геннадійович",
                    userAvatar: "1.jpg",
                    role: "admin",
                    permissions: {/**/}
                }
            });
            /*
             dispatch({
             type: ROUTING,
             payload: {
             method: 'replace',
             nextUrl: '/admin'
             }
             })
             */
        },2000)
    }
}

export function logout() {
    return {
        type: LOGOUT_SUCCESS
    }
}