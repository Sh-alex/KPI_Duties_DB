import {
    ADD_INFO_FROM_ANOTHER_OCCUP_SEARCH_FORM_SUBMIT_REQUEST,
    ADD_INFO_FROM_ANOTHER_OCCUP_SEARCH_FORM_SUBMIT_FAIL,
    ADD_INFO_FROM_ANOTHER_OCCUP_SEARCH_FORM_SUBMIT_SUCCESS,
    HIDE_MODAL_ADD_INFO_FROM_ANOTHER_OCCUP,
    SHOW_MODAL_ADD_INFO_FROM_ANOTHER_OCCUP,
    DISMISS_FORM_ADD_INFO_FROM_ANOTHER_OCCUP_ALERT,
    GO_BACK_TO_ADD_INFO_FROM_ANOTHER_OCCUP_FORM,
    ADD_INFO_FROM_ANOTHER_OCCUPATION
} from '../constants/addingInfoFromAnotherOccup'

import { SEARCH_OCCUPATION } from '../constants/API_URIs';

function submitFormRequest (data) {
    return {
        type: ADD_INFO_FROM_ANOTHER_OCCUP_SEARCH_FORM_SUBMIT_REQUEST,
        data
    }
}

function submitFormSuccess (response) {
    return {
        type: ADD_INFO_FROM_ANOTHER_OCCUP_SEARCH_FORM_SUBMIT_SUCCESS,
        response
    }
}

function submitFormFail (error) {
    return {
        type: ADD_INFO_FROM_ANOTHER_OCCUP_SEARCH_FORM_SUBMIT_FAIL,
        error
    }
}

export function submitFormAddInfoFromAnotherOccup(data, dispatch) {
    return function (dispatch) {
        dispatch(submitFormRequest(data));

        let searchGetParams = "?" +
        "searchType=" + data.searchType +
        "&occupGroupVal=" + data.occupGroupVal +
        "&searchText=" + data.searchText +
        "&searchTags=" + data.searchTags;
        if(data.creatingInStateDate)
            searchGetParams += "&creatingInStateDate_takeIntoAccount=" + data.creatingInStateDate.takeIntoAccount +
            "&creatingInStateDate_from=" + data.creatingInStateDate.from +
            "&creatingInStateDate_to=" + data.creatingInStateDate.to;
        if(data.creatingInKPIDate)
            searchGetParams += "&creatingInKPIDate_takeIntoAccount=" + data.creatingInKPIDate.takeIntoAccount +
            "&creatingInKPIDate_from=" + data.creatingInKPIDate.from +
            "&creatingInKPIDate_to=" + data.creatingInKPIDate.to;
        if(data.cancelingInStateDate)
            searchGetParams += "&cancelingInStateDate_takeIntoAccount=" + data.cancelingInStateDate.takeIntoAccount +
            "&cancelingInStateDate_from=" + data.cancelingInStateDate.from +
            "&cancelingInStateDate_to=" + data.cancelingInStateDate.to;
        if(data.cancelingInKPIDate)
            searchGetParams += "&cancelingInKPIDate_takeIntoAccount=" + data.cancelingInKPIDate.takeIntoAccount +
            "&cancelingInKPIDate_from=" + data.cancelingInKPIDate.from +
            "&cancelingInKPIDate_to=" + data.cancelingInKPIDate.to;

        //TODO: виділити у окремий action для пошуку посад
        return fetch(SEARCH_OCCUPATION + searchGetParams, {
            credentials: 'include',
            mode: 'cors',
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': CSRF_TOKEN
            }
        })
            .then((response) => {
                //перевіряємо щоб сервер повернув JSON з інформацією про помилку
                var contentType = response.headers.get("content-type");
                if (response.status == 200 || response.status == 400) {
                    if (contentType && contentType.indexOf("application/json") !== -1)
                        return response.json();
                    else
                        throw {_error: 'Отримано некоректну відповідь із результатами пошуку від сервера: очікувався JSON'}
                }
                else if (response.status === 404)
                    throw( {_error: 'Не знайдено відповідного методу на сервері!'} );
                else if (499 < response.status && response.status < 600)
                    throw( {_error: `Сталася помилка ${response.status} на сервері!`} );
                else
                    throw( {_error: 'Сталася невідома помилка при пошуку посад!'} );
            })
            .then(json => {
                if (json && json.foundOccupations)
                    return dispatch(submitFormSuccess(json.foundOccupations));
                // here I expect that the server will return
                // { _error: 'Some error text' }
                else if (json && json._error)
                    throw json;
                else
                    throw ( {_error: 'Отримано некоректний результат від сервера'} );
            })
            .catch(error => {
                let errorText = error && error._error || 'Сталася невідома помилка при пошуку посад!';
                return dispatch(submitFormFail(errorText));
            });
    }
}



export function hideModalAddInfoFromAnotherOccup() {
    return {
        type: HIDE_MODAL_ADD_INFO_FROM_ANOTHER_OCCUP
    }
}

//data = {
// field
// }
export function showModalAddInfoFromAnotherOccup(data) {
    return {
        type: SHOW_MODAL_ADD_INFO_FROM_ANOTHER_OCCUP,
        data
    }
}

export function dismissFormAddInfoFromAnotherOccupAlert() {
    return {
        type: DISMISS_FORM_ADD_INFO_FROM_ANOTHER_OCCUP_ALERT
    }  
}

export function goBackToAddInfoFromAnotherOccupForm() {
    return {
        type: GO_BACK_TO_ADD_INFO_FROM_ANOTHER_OCCUP_FORM
    }
}

function addInfoFromAnotherOccupation_itself(data) {
    return {
        type: ADD_INFO_FROM_ANOTHER_OCCUPATION,
        data: data.data,
        resultsType: data.resultsType,
        resPortionIndex: data.resPortionIndex
    }
}

export function addInfoFromAnotherOccupation(data, dispatch) {
    return function (dispatch) {
        dispatch( addInfoFromAnotherOccupation_itself(data) );
        dispatch( hideModalAddInfoFromAnotherOccup() );
    }
}