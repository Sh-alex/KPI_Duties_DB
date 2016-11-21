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
    return function (dispatch) {    //thunk щоб зробити асинхронний action
        dispatch(delOccupationRequest(occupId));

        return fetch(DELETE_OCCUPATION + occupId, {
            credentials: 'include',
            mode: 'cors',
            method: 'delete',
            // headers: {
            //     //'X-CSRFToken': CSRF_TOKEN
            // }
        })
            .then((response) => {
                if(response.status == 200)
                    return dispatch(delOccupationSuccess(occupId));
                else if (response.status == 410)
                    throw {_error: `Посаду з таким id = ${occupId} вже було видалено`};
                else if (response.status === 404)
                    throw( {_error: `Не знайдено відповідного методу на сервері або не існує такої посади з переданим id = ${occupId}!`} );
                else if (499 < response.status && response.status < 600)
                    throw( {_error: `Сталася помилка ${response.status} на сервері!`} );
            })
            .catch(error => {
                let errorText = error && error._error || 'Сталася невідома помилка при видаленні посади!';
                return dispatch(delOccupationFail(errorText, occupId));
            });
    }
}


export function dismissDelOccupationAlert() {
    return {
        type: DISMISS_DEL_OCCUP_ALERT
    }
}
