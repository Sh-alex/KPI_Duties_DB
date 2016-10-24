import {
    SEARCH_OCCUP_BOX_FORM_SUBMIT_REQUEST,
    SEARCH_OCCUP_BOX_FORM_SUBMIT_FAIL,
    SEARCH_OCCUP_BOX_FORM_SUBMIT_SUCCESS,
    DISMISS_SEARCH_OCCUP_BOX_FORM_ALERT
} from '../constants/searchOccupBox'

import { EDIT_OCCUP_SUBMIT_SUCCESS } from '../constants/modalEditOccup'

import { DEL_OCCUP_SUCCESS } from "../constants/delOccupation"

const initialState = {
    isSubmittngSearchForm: false,
    searchResData: null,
    searchError: null
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

        default:
            return state;
    }
}