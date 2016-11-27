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
    PRIOR_SEARCH_OCCUP_REQUEST,
    PRIOR_SEARCH_OCCUP_SUCCESS,
    PRIOR_SEARCH_OCCUP_FAIL,
    PRIOR_SEARCH_OCCUP_RESET
} from '../constants/searchOccupationsForm'

import { EDIT_OCCUP_SUBMIT_SUCCESS } from '../constants/modalEditOccup'

import { DEL_OCCUP_SUCCESS } from "../constants/delOccupation"

const initialState = {
    isSubmittngSearchForm: false,
    searchResData: null,
    searchError: "",

    downloadResError: "",
    isDownloadingResError: false,
    showModalResDownloadSettings: false,


    //попередній пошук посад по введеному рядку
    searchTextWillSucceed: undefined,   //undefined, true, false,
    searchTextResIsPrefetching: false,
    searchTextResPrefetchingError: "",
};

export default function (state = initialState, action) {
    let newSearchResData;
    switch(action.type) {
        case SEARCH_OCCUP_BOX_FORM_SUBMIT_REQUEST:
            return {
                ...state,
                searchError: null,
                searchResData: null,
                isSubmittngSearchForm: true,
            };
        case SEARCH_OCCUP_BOX_FORM_SUBMIT_SUCCESS:
            return {
                ...state,
                searchError: null,
                isSubmittngSearchForm: false,
                searchResData: action.response
            };
        case SEARCH_OCCUP_BOX_FORM_SUBMIT_FAIL:
            return {
                ...state,
                searchResData: null,
                isSubmittngSearchForm: false,
                searchError: action.error,
            };

        case DISMISS_SEARCH_OCCUP_BOX_FORM_ALERT:
            return {
                ...state,
                searchError: null
            };


        case PRIOR_SEARCH_OCCUP_REQUEST:
            return {
                ...state,
                searchTextWillSucceed: undefined,
                searchTextResIsPrefetching: true,
                searchTextResPrefetchingError: "",
            };
        case PRIOR_SEARCH_OCCUP_SUCCESS:
            return {
                ...state,
                searchTextWillSucceed: !!action.response,   //undefined, true, false,
                searchTextResIsPrefetching: false,
                searchTextResPrefetchingError: "",
            };
        case PRIOR_SEARCH_OCCUP_FAIL:
            return {
                ...state,
                searchTextWillSucceed: undefined,
                searchTextResIsPrefetching: false,
                searchTextResPrefetchingError: action.error,
            };

        case PRIOR_SEARCH_OCCUP_RESET:
            return {
                ...state,
                searchTextWillSucceed: undefined,   //undefined, true, false,
                searchTextResIsPrefetching: false,
                searchTextResPrefetchingError: "",
            };


        case DEL_OCCUP_SUCCESS:
            newSearchResData = Object.assign({}, state.searchResData);
            let index = newSearchResData.itemsList.indexOf(action.occupId);
            delete newSearchResData.itemsById[action.occupId];
            if(index !== -1)     //якщо знайшовся видаляємий id посади
                newSearchResData.itemsList.splice(index, 1);
            return {
                ...state,
                searchResData: newSearchResData
            };


        case EDIT_OCCUP_SUBMIT_SUCCESS:
            newSearchResData = Object.assign({}, state.searchResData);
            try {
                //змінюємо вигляд даних щоб можна було їх замінити у даних з результатами пошуку,
                // бо формат requestData та state.searchResData трохи відрізняється
                let descrTextMappingFunc = item => {
                    delete item.updateTextInRelativeOccup;
                    let usingOccupations = item.occupationsUsingText && item.occupationsUsingText.split(", ") || [];
                    delete item.occupationsUsingText;
                    return {
                        ...item,
                        usingOccupations
                    }
                };
                newSearchResData.itemsById[action.editedOccupId] = {
                    data: {
                        ...action.requestData.name,
                        durations: action.requestData.durations,
                        codes: action.requestData.codes.map(item => {
                            return {
                                "id": item.id,
                                "codeDKHP": item.codeDKHP && {
                                    "id": item.codeDKHP,
                                    "val": item.codeDKHPText
                                } || null,
                                "codeETDK": item.codeETDK && {
                                    "id": item.codeETDK,
                                    "val": item.codeETDKText
                                } || null,
                                "codeKP": item.codeKP && {
                                    "id": item.codeKP,
                                    "val": item.codeKPText
                                } || null,
                                "codeZKPPTR": item.codeZKPPTR && {
                                    "id": item.codeZKPPTR,
                                    "val": item.codeZKPPTRText
                                } || null,
                                "portionStartDate": item.portionStartDate,
                                "portionEndDate": item.portionEndDate
                            }
                        }),
                        responsibilities: action.requestData.responsibilities.map(descrTextMappingFunc),
                        haveToKnow: action.requestData.haveToKnow.map(descrTextMappingFunc),
                        qualiffRequir: action.requestData.qualiffRequir.map(descrTextMappingFunc)
                    },
                    id: action.editedOccupId
                };
                return {
                    ...state,
                    searchResData: newSearchResData
                };
            } catch (e) {
                console.error("Caught error when tried to apply edited occupation data to search results", e);
                return state;
            }


        case DOWNLOAD_SEARCH_OCCUP_RES_REQUEST:
            return {
                ...state,
                downloadResError: "",
                isDownloadingResError: true,
            };
        case DOWNLOAD_SEARCH_OCCUP_RES_SUCCESS:
            return {
                ...state,
                downloadResError: "",
                isDownloadingResError: false,
            };
        case DOWNLOAD_SEARCH_OCCUP_RES_FAIL:
            return {
                ...state,
                isDownloadingResError: false,
                downloadResError: action.error,
            };
        case DISMISS_DOWNLOAD_SEARCH_OCCUP_RES_ALERT:
            return {
                ...state,
                downloadResError: ""
            };
        case SHOW_MODAL_RES_DOWNLOAD_SETTINGS:
            return {
                ...state,
                showModalResDownloadSettings: true
            };
        case HIDE_MODAL_RES_DOWNLOAD_SETTINGS:
            return {
                ...state,
                showModalResDownloadSettings: false
            };

        default:
            return state;
    }
}