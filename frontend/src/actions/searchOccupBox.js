import { push as locationPush } from 'react-router-redux'

import {
    SEARCH_OCCUP_BOX_FORM_SUBMIT_REQUEST,
    SEARCH_OCCUP_BOX_FORM_SUBMIT_FAIL,
    SEARCH_OCCUP_BOX_FORM_SUBMIT_SUCCESS,
    DISMISS_SEARCH_OCCUP_BOX_FORM_ALERT,

    DOWNLOAD_SEARCH_OCCUP_RES_REQUEST,
    DOWNLOAD_SEARCH_OCCUP_RES_SUCCESS,
    DOWNLOAD_SEARCH_OCCUP_RES_FAIL,
    DISMISS_DOWNLOAD_SEARCH_OCCUP_RES_ALERT,
    SHOW_MODAL_RES_DOWNLOAD_SETTINGS,
    HIDE_MODAL_RES_DOWNLOAD_SETTINGS
} from '../constants/searchOccupBox'

import {
    DOWNLOAD_SEARCH_OCCUP_RES as API_DOWNLOAD_SEARCH_OCCUP_RES
} from '../constants/API_URIs'

import searchOccupations from "./searchOccupations"

function submitFormRequest (data) {
    return {
        type: SEARCH_OCCUP_BOX_FORM_SUBMIT_REQUEST,
        data
    }
}

function submitFormSuccess (response) {
    return {
        type: SEARCH_OCCUP_BOX_FORM_SUBMIT_SUCCESS,
        response
    }
}

function submitFormFail (error) {
    return {
        type: SEARCH_OCCUP_BOX_FORM_SUBMIT_FAIL,
        error
    }
}

export function searchOccupBoxFormSubmit(data, dispatch) {
    return function (dispatch) {    //thunk щоб зробити асинхронний action
        return searchOccupations({  //безпосередньо сам action для пошуку
            data,
            onRequest: () => dispatch(submitFormRequest(data)),
            onSucces: (foundOccupations, searchGetParams) => {
                dispatch( locationPush(location.pathname + searchGetParams) );
                dispatch( submitFormSuccess(foundOccupations) );
            },
            onFail: (errorText) => dispatch(submitFormFail(errorText))
        });
    }
}


export function dismissSearchOccupBoxFormAlert() {
    return {
        type: DISMISS_SEARCH_OCCUP_BOX_FORM_ALERT
    }
}





function downloadSearchOccupResRequest (occupIds, fields) {
    return {
        type: DOWNLOAD_SEARCH_OCCUP_RES_REQUEST,
        occupIds,
        fields
    }
}

function downloadSearchOccupResSuccess (response) {
    return {
        type: DOWNLOAD_SEARCH_OCCUP_RES_SUCCESS,
        response
    }
}

function downloadSearchOccupResFail (error) {
    return {
        type: DOWNLOAD_SEARCH_OCCUP_RES_FAIL,
        error
    }
}

export function downloadSearchOccupRes(fieldsArr, dispatch) {
    return function (dispatch, getState) {    //thunk щоб зробити асинхронний action
        let searchResData = getState().searchOccupBox.searchResData,
            occupIds;

        if(!searchResData || !searchResData.itemsList || !searchResData.itemsList.length)
            return dispatch(downloadSearchOccupResFail("Сталася неочікувана помилка при спробі завантажити результати пошуку: не вдалося визначити ідентифікатори посад які треба завантажити!"));

        occupIds = searchResData.itemsList;

        if(!fieldsArr.length)
            return dispatch(downloadSearchOccupResFail("Не можна завантажити результати пошуку без жодного поля!"));

        //dispatch(downloadSearchOccupResRequest(occupIds, fieldsArr));
        let access_token = localStorage.jwtToken ? 'Bearer ' + localStorage.jwtToken : "";

        // api/occupations/downloadSearchResults?occupIds=2,5,8,10,16,22,23,27,28&fields=occupationName,occupationNameMin,occupationGroup,qualiffRequirText,responsibilitiesText,haveToKnowText,codeDKHP,codeETDK,codeKP,codeZKPPTR,durationsStartDate,durationsStopDate,inKpi
        let searchURI = `${API_DOWNLOAD_SEARCH_OCCUP_RES}?occupIds=${occupIds}&fields=${fieldsArr}&a=${access_token}`;

        window.open(searchURI, '_blank');
        dispatch(hideModalResDownloadSettings());

        // Легше не відправляти ніяких запитів, а просто відкрити посилання у новій вкладці
        // return fetch(
        //     searchURI,
        //     {
        //         credentials: 'include',
        //         mode: 'cors',
        //         method: 'get',
        //         // headers: {
        //         //     //'X-CSRFToken': CSRF_TOKEN
        //         // }
        //     }
        // )
        //     .then( response => {
        //         if(response.status === 404)
        //             throw 'При спробі завантажити результати пошуку не знайдено відповідного методу на сервері!';
        //         if(response.status === 400)
        //             throw 'Не вдалося завантажити результати пошуку: передано некоректні дані на сервер';
        //         if( 499 < response.status && response.status < 600 )
        //             throw `При завантажити результати пошуку сталася помилка ${response.status} на сервері!`;
        //         if(response.status !== 200)
        //             throw 'Сталася невідома помилка при спробі завантажити результати пошуку!';
        //
        //         var contentType = response.headers.get("content-type");
        //         if(contentType && contentType.indexOf("blob") !== -1) {
        //             return response.blob();
        //         }
        //     })
        //     .then( blob => {
        //         if(!blob)
        //             throw "Отримано некоректне посилання на файл від сервера!";
        //
        //         var link = document.createElement('a');
        //         link.href = window.URL.createObjectURL(blob);
        //         link.download="Результати пошуку " + new Date() + ".xlsx";
        //         link.click();
        //
        //         window.open(link);
        //
        //         dispatch(downloadSearchOccupResSuccess(link));
        //         dispatch(hideModalResDownloadSettings());
        //     })
        //     .catch( error => {
        //         if(!error || !(typeof error == "string"))
        //             error = 'Сталася невідома помилка при спробі завантажити результати пошуку!';
        //         dispatch(downloadSearchOccupResFail(error));
        //     })
    }
}


export function dismissDownloadSearchOccupResAlert() {
    return {
        type: DISMISS_DOWNLOAD_SEARCH_OCCUP_RES_ALERT
    }
}

export function showModalResDownloadSettings() {
    return {
        type: SHOW_MODAL_RES_DOWNLOAD_SETTINGS
    }
}

export function hideModalResDownloadSettings() {
    return {
        type: HIDE_MODAL_RES_DOWNLOAD_SETTINGS
    }
}
