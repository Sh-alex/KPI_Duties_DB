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

export function downloadSearchOccupRes(fields, dispatch) {
    return function (dispatch, getState) {    //thunk щоб зробити асинхронний action
        let searchResData = getState().searchOccupBox.searchResData,
            fieldsArr = [],
            field, occupIds;

        if(!searchResData || !searchResData.itemsList || !searchResData.itemsList.length)
            return dispatch(downloadSearchOccupResFail("Сталася неочікувана помилка при спробі завантажити результати пошуку: не вдалося визначити список посад які треба завантажити!"));

        occupIds = searchResData.itemsList;
        for(field in fields) {
            if(fields.hasOwnProperty(field) && fields[field]) // якщо відповідне поле == true
                fieldsArr.push(field)
        }

        if(!fieldsArr.length)
            return dispatch(downloadSearchOccupResFail("Не можна завантажити результати пошуку без жодного поля!"));

        dispatch(downloadSearchOccupResRequest(occupIds, fieldsArr));

        //   /api/occupations/downloadSearchResults?occupIds=2,5,8,10,16,22,23,27,28&fields=occupationName,occupationNameMin,occupationGroup,qualiffRequirText,responsibilitiesText,haveToKnowText,codeDKHP,codeETDK,codeKP,codeZKPPTR,durationsStartDate,durationsStopDate,inKpi
        return fetch(
            `${API_DOWNLOAD_SEARCH_OCCUP_RES}?occupIds=${occupIds}&fields=${fieldsArr}`,
            {
                credentials: 'include',
                mode: 'cors',
                method: 'get',
                // headers: {
                //     //'X-CSRFToken': CSRF_TOKEN
                // }
            }
        )
            .then( response => {
                if(response.status === 404)
                    throw 'При спробі завантажити результати пошуку не знайдено відповідного методу на сервері!';
                if(response.status === 400)
                    throw 'Не вдалося завантажити результати пошуку: передано некоректні дані на сервер';
                if( 499 < response.status && response.status < 600 )
                    throw `При завантажити результати пошуку сталася помилка ${response.status} на сервері!`;
                if(response.status !== 200)
                    throw 'Сталася невідома помилка при спробі завантажити результати пошуку!';

                // var contentType = response.headers.get("content-type");
                // if(contentType && contentType.indexOf("text/plain") !== -1) {
                    return response.text();
                // }
            })
            .then( link => {
                if(!link)   //TODO: перевіряти регулярним виразом
                    throw "Отримано некоректне посилання на файл від сервера!";

                window.open(link);

                dispatch(downloadSearchOccupResSuccess(link));
                dispatch(hideModalResDownloadSettings());
            })
            .catch( error => {
                if(!error || !(typeof error == "string"))
                    error = 'Сталася невідома помилка при спробі завантажити результати пошуку!';
                dispatch(downloadSearchOccupResFail(error));
            })
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
