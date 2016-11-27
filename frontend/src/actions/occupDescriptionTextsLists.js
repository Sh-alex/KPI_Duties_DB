import {
    FETCH_HAVE_TO_KNOW_TEXTS_LIST_REQUEST,
    FETCH_HAVE_TO_KNOW_TEXTS_LIST_FAIL,
    FETCH_HAVE_TO_KNOW_TEXTS_LIST_SUCCESS,

    FETCH_RESPONSIBILITIES_TEXTS_LIST_REQUEST,
    FETCH_RESPONSIBILITIES_TEXTS_LIST_FAIL,
    FETCH_RESPONSIBILITIES_TEXTS_LIST_SUCCESS,

    FETCH_QUALIFF_REQUIR_TEXTS_LIST_REQUEST,
    FETCH_QUALIFF_REQUIR_TEXTS_LIST_FAIL,
    FETCH_QUALIFF_REQUIR_TEXTS_LIST_SUCCESS,

    ADD_NEW_HAVE_TO_KNOW_TEXT_REQUEST,
    ADD_NEW_HAVE_TO_KNOW_TEXT_SUCCESS,
    ADD_NEW_HAVE_TO_KNOW_TEXT_FAIL,
    ADD_NEW_HAVE_TO_KNOW_TEXT_CLEAR_MSG,

    ADD_NEW_RESPONSIBILITIES_TEXT_REQUEST,
    ADD_NEW_RESPONSIBILITIES_TEXT_SUCCESS,
    ADD_NEW_RESPONSIBILITIES_TEXT_FAIL,
    ADD_NEW_RESPONSIBILITIES_TEXT_CLEAR_MSG,

    ADD_NEW_QUALIFF_REQUIR_TEXT_REQUEST,
    ADD_NEW_QUALIFF_REQUIR_TEXT_SUCCESS,
    ADD_NEW_QUALIFF_REQUIR_TEXT_FAIL,
    ADD_NEW_QUALIFF_REQUIR_TEXT_CLEAR_MSG,

    EDIT_HAVE_TO_KNOW_TEXT_REQUEST,
    EDIT_HAVE_TO_KNOW_TEXT_SUCCESS,
    EDIT_HAVE_TO_KNOW_TEXT_FAIL,
    EDIT_HAVE_TO_KNOW_TEXT_CLEAR_MSG,

    EDIT_RESPONSIBILITIES_TEXT_REQUEST,
    EDIT_RESPONSIBILITIES_TEXT_SUCCESS,
    EDIT_RESPONSIBILITIES_TEXT_FAIL,
    EDIT_RESPONSIBILITIES_TEXT_CLEAR_MSG,

    EDIT_QUALIFF_REQUIR_TEXT_REQUEST,
    EDIT_QUALIFF_REQUIR_TEXT_SUCCESS,
    EDIT_QUALIFF_REQUIR_TEXT_FAIL,
    EDIT_QUALIFF_REQUIR_TEXT_CLEAR_MSG,

    DEL_HAVE_TO_KNOW_TEXT_REQUEST,
    DEL_HAVE_TO_KNOW_TEXT_SUCCESS,
    DEL_HAVE_TO_KNOW_TEXT_FAIL,
    DEL_HAVE_TO_KNOW_TEXT_CLEAR_MSG,

    DEL_RESPONSIBILITIES_TEXT_REQUEST,
    DEL_RESPONSIBILITIES_TEXT_SUCCESS,
    DEL_RESPONSIBILITIES_TEXT_FAIL,
    DEL_RESPONSIBILITIES_TEXT_CLEAR_MSG,

    DEL_QUALIFF_REQUIR_TEXT_REQUEST,
    DEL_QUALIFF_REQUIR_TEXT_SUCCESS,
    DEL_QUALIFF_REQUIR_TEXT_FAIL,
    DEL_QUALIFF_REQUIR_TEXT_CLEAR_MSG,
} from '../constants/occupDescriptionTextsLists'

import {
    FETCH_HAVE_TO_KNOW_TEXTS_LIST as API_FETCH_HAVE_TO_KNOW_TEXTS_LIST,
    FETCH_RESPONSIBILITIES_TEXTS_LIST as API_FETCH_RESPONSIBILITIES_TEXTS_LIST,
    FETCH_QUALIFF_REQUIR_TEXTS_LIST as API_FETCH_QUALIFF_REQUIR_TEXTS_LIST,

    ADD_NEW_HAVE_TO_KNOW_TEXT as API_ADD_NEW_HAVE_TO_KNOW_TEXT,
    ADD_NEW_RESPONSIBILITIES_TEXT as API_ADD_NEW_RESPONSIBILITIES_TEXT,
    ADD_NEW_QUALIFF_REQUIR_TEXT as API_ADD_NEW_QUALIFF_REQUIR_TEXT,

    EDIT_HAVE_TO_KNOW_TEXT as API_EDIT_HAVE_TO_KNOW_TEXT,
    EDIT_RESPONSIBILITIES_TEXT as API_EDIT_RESPONSIBILITIES_TEXT,
    EDIT_QUALIFF_REQUIR_TEXT as API_EDIT_QUALIFF_REQUIR_TEXT,

    DEL_HAVE_TO_KNOW_TEXT as API_DEL_HAVE_TO_KNOW_TEXT,
    DEL_RESPONSIBILITIES_TEXT as API_DEL_RESPONSIBILITIES_TEXT,
    DEL_QUALIFF_REQUIR_TEXT as API_DEL_QUALIFF_REQUIR_TEXT,
} from '../constants/API_URIs';

import generateEditingOccupDcValRequestFunction from "../utils/generateEditingOccupDcValRequestFunction"
import generateAddingOccupDcValRequestFunction from "../utils/generateAddingOccupDcValRequestFunction"
import generateDelOccupDcValRequestFunction from "../utils/generateDelOccupDcValRequestFunction"
import generateFetchingOccupDcValRequestFunction from "../utils/generateFetchingOccupDcValRequestFunction"


export const fetchHaveToKnowTextsList = generateFetchingOccupDcValRequestFunction({
    requestConst: FETCH_HAVE_TO_KNOW_TEXTS_LIST_REQUEST,
    successConst: FETCH_HAVE_TO_KNOW_TEXTS_LIST_SUCCESS,
    failConst: FETCH_HAVE_TO_KNOW_TEXTS_LIST_FAIL,
    listName: "Повинен знати",
    apiURI: API_FETCH_HAVE_TO_KNOW_TEXTS_LIST,
});
export const fetchResponsibilitiesTextsList = generateFetchingOccupDcValRequestFunction({
    requestConst: FETCH_RESPONSIBILITIES_TEXTS_LIST_REQUEST,
    successConst: FETCH_RESPONSIBILITIES_TEXTS_LIST_SUCCESS,
    failConst: FETCH_RESPONSIBILITIES_TEXTS_LIST_FAIL,
    listName: "Завдання, обов\'язки та повноваження",
    apiURI: API_FETCH_RESPONSIBILITIES_TEXTS_LIST,
});
export const fetchQualiffRequirTextsList = generateFetchingOccupDcValRequestFunction({
    requestConst: FETCH_QUALIFF_REQUIR_TEXTS_LIST_REQUEST,
    successConst: FETCH_QUALIFF_REQUIR_TEXTS_LIST_SUCCESS,
    failConst: FETCH_QUALIFF_REQUIR_TEXTS_LIST_FAIL,
    listName: "Кваліфікаційні вимоги",
    apiURI: API_FETCH_QUALIFF_REQUIR_TEXTS_LIST,
});


export const addNewHaveToKnowText = generateAddingOccupDcValRequestFunction({
    requestConst: ADD_NEW_HAVE_TO_KNOW_TEXT_REQUEST,
    successConst: ADD_NEW_HAVE_TO_KNOW_TEXT_SUCCESS,
    failConst: ADD_NEW_HAVE_TO_KNOW_TEXT_FAIL,
    listName: "Повинен знати",
    apiURI: API_ADD_NEW_HAVE_TO_KNOW_TEXT
});
export const addNewQualiffRequirText = generateAddingOccupDcValRequestFunction({
    requestConst: ADD_NEW_QUALIFF_REQUIR_TEXT_REQUEST,
    successConst: ADD_NEW_QUALIFF_REQUIR_TEXT_SUCCESS,
    failConst: ADD_NEW_QUALIFF_REQUIR_TEXT_FAIL,
    listName: "Кваліфікаційні вимоги",
    apiURI: API_ADD_NEW_QUALIFF_REQUIR_TEXT
});
export const addNewResponsibilitiesText = generateAddingOccupDcValRequestFunction({
    requestConst: ADD_NEW_RESPONSIBILITIES_TEXT_REQUEST,
    successConst: ADD_NEW_RESPONSIBILITIES_TEXT_SUCCESS,
    failConst: ADD_NEW_RESPONSIBILITIES_TEXT_FAIL,
    listName: "Завдання, обов'язки та повноваження",
    apiURI: API_ADD_NEW_RESPONSIBILITIES_TEXT
});


export function clearHaveToKnowTextAddingMsg() {
    return {
        type: ADD_NEW_HAVE_TO_KNOW_TEXT_CLEAR_MSG
    }
}

export function clearQualiffRequirTextAddingMsg() {
    return {
        type: ADD_NEW_QUALIFF_REQUIR_TEXT_CLEAR_MSG
    }
}

export function clearResponsibilitiesTextAddingMsg() {
    return {
        type: ADD_NEW_RESPONSIBILITIES_TEXT_CLEAR_MSG
    }
}


export const editHaveToKnowText = generateEditingOccupDcValRequestFunction({
    requestConst: EDIT_HAVE_TO_KNOW_TEXT_REQUEST,
    successConst: EDIT_HAVE_TO_KNOW_TEXT_SUCCESS,
    failConst: EDIT_HAVE_TO_KNOW_TEXT_FAIL,
    listName: "Повинен знати",
    apiURI: API_EDIT_HAVE_TO_KNOW_TEXT
});
export const editQualiffRequirText = generateEditingOccupDcValRequestFunction({
    requestConst: EDIT_QUALIFF_REQUIR_TEXT_REQUEST,
    successConst: EDIT_QUALIFF_REQUIR_TEXT_SUCCESS,
    failConst: EDIT_QUALIFF_REQUIR_TEXT_FAIL,
    listName: "Кваліфікаційні вимоги",
    apiURI: API_EDIT_QUALIFF_REQUIR_TEXT
});
export const editResponsibilitiesText = generateEditingOccupDcValRequestFunction({
    requestConst: EDIT_RESPONSIBILITIES_TEXT_REQUEST,
    successConst: EDIT_RESPONSIBILITIES_TEXT_SUCCESS,
    failConst: EDIT_RESPONSIBILITIES_TEXT_FAIL,
    listName: "Завдання, обов'язки та повноваження",
    apiURI: API_EDIT_RESPONSIBILITIES_TEXT
});

export function editHaveToKnowTextClearMsg() {
    return {
        type: EDIT_HAVE_TO_KNOW_TEXT_CLEAR_MSG
    }
}

export function editQualiffRequirTextClearMsg() {
    return {
        type: EDIT_QUALIFF_REQUIR_TEXT_CLEAR_MSG
    }
}

export function editResponsibilitiesTextClearMsg() {
    return {
        type: EDIT_RESPONSIBILITIES_TEXT_CLEAR_MSG
    }
}


export const delHaveToKnowText = generateDelOccupDcValRequestFunction({
    requestConst: DEL_HAVE_TO_KNOW_TEXT_REQUEST,
    successConst: DEL_HAVE_TO_KNOW_TEXT_SUCCESS,
    failConst: DEL_HAVE_TO_KNOW_TEXT_FAIL,
    listName: "Повинен знати",
    apiURI: API_DEL_HAVE_TO_KNOW_TEXT
});
export const delQualiffRequirText = generateDelOccupDcValRequestFunction({
    requestConst: DEL_QUALIFF_REQUIR_TEXT_REQUEST,
    successConst: DEL_QUALIFF_REQUIR_TEXT_SUCCESS,
    failConst: DEL_QUALIFF_REQUIR_TEXT_FAIL,
    listName: "Кваліфікаційні вимоги",
    apiURI: API_DEL_QUALIFF_REQUIR_TEXT
});
export const delResponsibilitiesText = generateDelOccupDcValRequestFunction({
    requestConst: DEL_RESPONSIBILITIES_TEXT_REQUEST,
    successConst: DEL_RESPONSIBILITIES_TEXT_SUCCESS,
    failConst: DEL_RESPONSIBILITIES_TEXT_FAIL,
    listName: "Завдання, обов'язки та повноваження",
    apiURI: API_DEL_RESPONSIBILITIES_TEXT
});

export function delHaveToKnowTextClearMsg() {
    return {
        type: DEL_HAVE_TO_KNOW_TEXT_CLEAR_MSG
    }
}

export function delQualiffRequirTextClearMsg() {
    return {
        type: DEL_QUALIFF_REQUIR_TEXT_CLEAR_MSG
    }
}

export function delResponsibilitiesTextClearMsg() {
    return {
        type: DEL_RESPONSIBILITIES_TEXT_CLEAR_MSG
    }
}
