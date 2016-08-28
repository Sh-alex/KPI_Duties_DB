import {
    ADD_FORM_SUBMIT_REQUEST,
    ADD_FORM_SUBMIT_FAIL,
    ADD_FORM_SUBMIT_SUCCESS,

    HIDE_ADD_FORM_SERVER_RESP_MSG,

    ADD_FORM_OCCUPATION_GROUP_INP_CHANGE,
    ADD_FORM_CLARIFICATION_INP_CHANGE,
    ADD_FORM_CLARIFIED_OCCUP_INP_CHANGE
} from '../constants/AddOccupBox'

import {
    ADD_NEW_CLARIFICATION_SUCCESS
} from '../constants/occupationNameInfo'

function calcNewOccupationNameVal(oldVal, clarifiedOccupTextVal, clarificationTextVal) {
    if(clarifiedOccupTextVal && clarificationTextVal)
        return clarifiedOccupTextVal + " " + clarificationTextVal;
    if(clarifiedOccupTextVal)
        return clarifiedOccupTextVal;
    if(clarificationTextVal)
        return clarificationTextVal;
    return oldVal;
}

export default function addOccupForm(state, action) {
    if(state.shouldShowServerRespMsg === undefined)
        return {
            ...state,
            shouldShowServerRespMsg: false
        };
    switch(action.type) {
        case ADD_FORM_SUBMIT_FAIL:
        case ADD_FORM_SUBMIT_SUCCESS:
            return {
                ...state,
                shouldShowServerRespMsg: true
            };
        case HIDE_ADD_FORM_SERVER_RESP_MSG:
        case ADD_FORM_SUBMIT_REQUEST:
            return {
                ...state,
                _error: "",
                shouldShowServerRespMsg: false
            };


        case ADD_FORM_CLARIFICATION_INP_CHANGE:
            return {
                ...state,
                name: {
                    ...state.name,
                    clarification: {
                        ...state.name.clarification,
                        value: action.newVal.id
                    },
                    occupationName: {
                        ...state.name.occupationName,
                        value: calcNewOccupationNameVal(
                            state.name.occupationName.value,
                            state.name.clarifiedOccup.value == -1 ? "" : state.clarifiedOccupTextVal,
                            action.newVal.textValue
                        )
                    },
                    occupationNameMin: {
                        ...state.name.occupationNameMin,
                        value: calcNewOccupationNameVal(
                            state.name.occupationNameMin.value,
                            state.name.clarifiedOccup.value == -1 ? "" : state.clarifiedOccupTextVal,
                            action.newVal.textValue
                        )
                    }
                },
                clarificationTextVal: action.newVal.textValue    //потрібно щоб порахувати occupationName
            };
        case ADD_FORM_CLARIFIED_OCCUP_INP_CHANGE:
            return {
                ...state,
                name: {
                    ...state.name,
                    occupationName: {
                        ...state.name.occupationName,
                        value: calcNewOccupationNameVal(
                            state.name.occupationName.value,
                            action.newVal.id == -1 ? "" : action.newVal.textValue,    //якщо відсутня уточнювана посада
                            state.clarificationTextVal
                        )
                    },
                    occupationNameMin: {
                        ...state.name.occupationNameMin,
                        value: calcNewOccupationNameVal(
                            state.name.occupationNameMin.value,
                            action.newVal.id == -1 ? "" : action.newVal.textValue,    //якщо відсутня уточнювана посада
                            state.clarificationTextVal
                        )
                    }
                },
                clarifiedOccupTextVal: action.newVal.textValue    //потрібно щоб порахувати occupationName
            };

        case ADD_FORM_OCCUPATION_GROUP_INP_CHANGE: //TODO
        default:
            return state;
    }
}