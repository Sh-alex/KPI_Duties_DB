import {
    EDIT_OCCUP_SUBMIT_REQUEST,
    EDIT_OCCUP_SUBMIT_FAIL,
    EDIT_OCCUP_SUBMIT_SUCCESS,

    EDIT_OCCUP_HIDE_SERVER_RESP_MSG,

    EDIT_OCCUP_OCCUPATION_GROUP_INP_CHANGE,
    EDIT_OCCUP_CLARIFICATION_INP_CHANGE,
    EDIT_OCCUP_CLARIFIED_OCCUP_INP_CHANGE,
    EDIT_OCCUP_INP_IS_VIRTUAL_CHANGE,

    HIDE_MODAL_EDIT_OCCUP,
    SHOW_MODAL_EDIT_OCCUP,
} from '../constants/modalEditOccup'

import { EDIT_OCCUPATION as API_EDIT_OCCUPATION} from '../constants/API_URIs';


function submitFormRequest (data) {
    return {
        type: EDIT_OCCUP_SUBMIT_REQUEST,
        data
    }
}

function submitFormSuccess (response, requestData, editedOccupId) {
    return {
        type: EDIT_OCCUP_SUBMIT_SUCCESS,
        response,
        requestData,
        editedOccupId
    }
}

function submitFormFail (error) {
    return {
        type: EDIT_OCCUP_SUBMIT_FAIL,
        error
    }
}

export function editOccup(editingOccupId, formData, dispatch) {
    /*
     - якщо змінили описовий текст і треба зберегти зміни для усіх пов'язаних посад,
       то передаємо новий текст у полі text та idText старого тексту
     - якщо змінили описовий текст і треба зберегти зміни ЛИШЕ ДЛЯ ЦІЄЇ ПОСАДИ,
       але для інших посад які використовують попередній текст, залишити його,
       то передаємо новий текст, а idText=null
     - якщо описовий текст залишили без змін, передаємо старі text і idText
     */
    let data = {
        ...formData,
        responsibilities: formData.responsibilities.map((item, i) => {
            return {
                ...item,
                idText: !item.updateTextInRelativeOccup ? null : item.idText
            };
        }),
        haveToKnow: formData.haveToKnow.map((item, i) => {
            return {
                ...item,
                idText: !item.updateTextInRelativeOccup ? null : item.idText
            };
        }),
        qualiffRequir: formData.qualiffRequir.map((item, i) => {
            return {
                ...item,
                idText: !item.updateTextInRelativeOccup ? null : item.idText
            };
        })
    };

    dispatch(submitFormRequest(data));

    //тут проміс треба для redux-form
    return new Promise((resolve, reject) => {
        return fetch(
            API_EDIT_OCCUPATION + editingOccupId,
            {
                credentials: 'include',
                mode: 'cors',
                method: 'put',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    //'X-CSRFToken': CSRF_TOKEN
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    resolve( dispatch(submitFormSuccess(response, data, editingOccupId)) );
                }
                else if (response.status === 400) {
                    throw(new Error("Передано некоректні дані на сервер!"));
                    /*
                     //перевіряємо щоб сервер поверув JSON з інформацією про помилку
                     var errorsObj,
                     contentType = response.headers.get("content-type");
                     if(contentType && contentType.indexOf("application/json") !== -1 && (errorsObj = response.json().errors instanceof Object)) {
                     return reject(errorsObj);
                     } else {
                     throw(new Error("Отримано некоректну відповідь від сервера!"));
                     }
                     */
                } else if(response.status === 404) {
                    throw(new Error('Не знайдено відповідного методу на сервері!'));
                } else if(response.status === 410) {
                    throw {_error: `Посаду з таким id = ${editingOccupId} вже було видалено`};
                } else if( 499 < response.status && response.status < 600 ) {
                    throw(new Error(`Сталася помилка ${response.status} на сервері!`));
                } else {
                    // we're not sure what happened, but handle it:
                    // our Error will get passed straight to `.catch()`
                    throw(new Error('Сталася невідома помилка при редагуванні посади!'));
                }
            })
            .catch( (error = 'Сталася невідома помилка при редагуванні посади!') => {
                dispatch(submitFormFail(error));
                reject({ _error: error.message || error });
            });
    });
}


export function editOccupHideServerRespMsg() {
    return {
        type: EDIT_OCCUP_HIDE_SERVER_RESP_MSG
    }
}


export function occupationGroupInpChange(newVal) {
    return {
        type: EDIT_OCCUP_OCCUPATION_GROUP_INP_CHANGE,
        newVal
    }
}

export function clarificationInpChange(newVal) {
    return {
        type: EDIT_OCCUP_CLARIFICATION_INP_CHANGE,
        newVal
    }
}

export function clarifiedOccupInpChange(newVal) {
    return {
        type: EDIT_OCCUP_CLARIFIED_OCCUP_INP_CHANGE,
        newVal
    }
}


export function hideModalEditOccup() {
    return function (dispatch, getState) {
        dispatch( {
            type: HIDE_MODAL_EDIT_OCCUP,
        });
        dispatch(editOccupHideServerRespMsg());
    }
}

export function showModalEditOccup(editingData, dispatch) {
    return function (dispatch, getState) {
        dispatch( {
            type: SHOW_MODAL_EDIT_OCCUP,
            editingData
        });
    }
}
