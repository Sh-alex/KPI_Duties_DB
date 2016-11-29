import {
    DEL_OCCUP_REQUEST,
    DEL_OCCUP_FAIL,
    DEL_OCCUP_SUCCESS,
    DISMISS_DEL_OCCUP_ALERT
} from '../constants/delOccupation'

import { DELETE_OCCUPATION } from '../constants/API_URIs';

function delOccupationRequest (occupId) {
    return {
        type: DEL_OCCUP_REQUEST,
        occupId
    }
}

function delOccupationSuccess (occupId) {
    return {
        type: DEL_OCCUP_SUCCESS,
        occupId
    }
}

function delOccupationFail (error, occupId) {
    return {
        type: DEL_OCCUP_FAIL,
        occupId,
        error
    }
}

export function delOccupation(occupId, dispatch) {
    return function (dispatch) {
        dispatch(delOccupationRequest(occupId));
        let access_token = localStorage.jwtToken;

        return fetch(DELETE_OCCUPATION + occupId, {
            credentials: 'include',
            mode: 'cors',
            method: 'delete',
            headers: {
                'Authorization': access_token ? 'Bearer ' + access_token : ""
                //'X-CSRFToken': CSRF_TOKEN
            }
        })
            .then((response) => {
                if(response.ok)
                    return dispatch(delOccupationSuccess(occupId));
                else if (response.status == 410)
                    throw `Посаду з таким id = ${occupId} вже було видалено`;
                else if (response.status === 404)
                    throw `Не знайдено відповідного методу на сервері або не існує такої посади з переданим id = ${occupId}!`;
                else if (499 < response.status && response.status < 600)
                    throw `Сталася помилка ${response.status} на сервері!`;
            })
            .catch(error => {
                if(error && error.message === "Failed to fetch")
                    error = `Сталася невідома помилка при видаленні посади! Перевірте роботу мережі.`;
                else if(!error || !(typeof error == "string"))
                    error = `Сталася невідома помилка при видаленні посади`;

                return dispatch(delOccupationFail(error, occupId));
            });
    }
}


export function dismissDelOccupationAlert() {
    return {
        type: DISMISS_DEL_OCCUP_ALERT
    }
}
