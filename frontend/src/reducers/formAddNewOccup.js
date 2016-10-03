import {
    ADD_NEW_OCCUP_SUBMIT_REQUEST,
    ADD_NEW_OCCUP_SUBMIT_FAIL,
    ADD_NEW_OCCUP_SUBMIT_SUCCESS,

    ADD_NEW_OCCUP_HIDE_SERVER_RESP_MSG,

    ADD_NEW_OCCUP_OCCUPATION_GROUP_INP_CHANGE,
    ADD_NEW_OCCUP_CLARIFICATION_INP_CHANGE,
    ADD_NEW_OCCUP_CLARIFIED_OCCUP_INP_CHANGE,

    ADD_NEW_OCCUP_INP_IS_VIRTUAL_CHANGE
} from '../constants/addNewOccup'

import {
    ADD_INFO_FROM_ANOTHER_OCCUPATION,
    ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_CODES,
    ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_RESPONSIBLITIES,
    ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_HAVE_TO_KNOW,
    ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_QUALIFF_REQUIR
} from '../constants/addingInfoFromAnotherOccup'

function calcNewOccupationNameVal(oldVal, clarifiedOccupTextVal, clarificationTextVal) {
    if(clarifiedOccupTextVal && clarificationTextVal)
        return clarifiedOccupTextVal + " " + clarificationTextVal;
    if(clarifiedOccupTextVal)
        return clarifiedOccupTextVal;
    if(clarificationTextVal)
        return clarificationTextVal;
    return oldVal;
}

export default function formEditOccupInfo(state, action) {
    if(state.shouldShowServerRespMsg === undefined)
        return {
            ...state,
            shouldShowServerRespMsg: false
        };
    switch(action.type) {
        case ADD_NEW_OCCUP_SUBMIT_FAIL:
        case ADD_NEW_OCCUP_SUBMIT_SUCCESS:
            return {
                ...state,
                shouldShowServerRespMsg: true
            };
        case ADD_NEW_OCCUP_HIDE_SERVER_RESP_MSG:
        case ADD_NEW_OCCUP_SUBMIT_REQUEST:
        case "redux-form/RESET":
            return {
                ...state,
                _error: "",
                shouldShowServerRespMsg: false
            };

        case ADD_INFO_FROM_ANOTHER_OCCUPATION:
            if(action.resForm !== 'addForm')
                return state;
            switch(action.resultsType){
                case ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_CODES:
                    if(!action.data || !action.data.codes instanceof Array)
                        return state;
                    else
                        return {
                            ...state,
                            codes: action.data.codes.map(portion => {
                                return {
                                    "id": {
                                        "initial": null,
                                        "value": null,
                                        "_isFieldValue": true
                                    },
                                    "portionStartDate": {
                                        "initial": null,
                                        "value": null,
                                        "_isFieldValue": true
                                    },
                                    "portionEndDate": {
                                        "initial": null,
                                        "value": null,
                                        "_isFieldValue": true
                                    },
                                    "codeKP": {
                                        "initial": null,
                                        "value": portion.codeKP ? portion.codeKP.id : null,
                                        "_isFieldValue": true,
                                    },
                                    "codeETDK": {
                                        "initial": null,
                                        "value": portion.codeETDK ? portion.codeETDK.id : null,
                                        "_isFieldValue": true
                                    },
                                    "codeZKPPTR": {
                                        "initial": null,
                                        "value": portion.codeZKPPTR ? portion.codeZKPPTR.id : null,
                                        "_isFieldValue": true
                                    },
                                    "codeDKHP": {
                                        "initial": null,
                                        "value": portion.codeDKHP ? portion.codeDKHP.id : null,
                                        "_isFieldValue": true
                                    },
                                    "codeKPText": {
                                        "initial": null,
                                        "value": portion.codeKP ? portion.codeKP.val : null,
                                        "_isFieldValue": true,
                                    },
                                    "codeETDKText": {
                                        "initial": null,
                                        "value": portion.codeETDK ? portion.codeETDK.val : null,
                                        "_isFieldValue": true
                                    },
                                    "codeZKPPTRText": {
                                        "initial": null,
                                        "value": portion.codeZKPPTR ? portion.codeZKPPTR.val : null,
                                        "_isFieldValue": true
                                    },
                                    "codeDKHPText": {
                                        "initial": null,
                                        "value": portion.codeDKHP ? portion.codeDKHP.val : null,
                                        "_isFieldValue": true
                                    }
                                }
                            })
                        };
                    break;
                case ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_RESPONSIBLITIES:
                    if(!action.data)
                        return state;
                    else
                        return {
                            ...state,
                            responsibilities: state.responsibilities.map( (portion, portionIndex) => {
                                if(portionIndex != action.resPortionIndex)
                                    return portion;
                                return {
                                    "portionStartDate": {
                                        "initial": null,
                                        "value": null,
                                        "_isFieldValue": true
                                    },
                                    "portionEndDate": {
                                        "initial": null,
                                        "value": null,
                                        "_isFieldValue": true
                                    },
                                    "text": {
                                        "initial": "",
                                        "value": action.data.text,
                                        "_isFieldValue": true
                                    },
                                    "idText": {
                                        "initial": null,
                                        "value": action.data.idText,
                                        "_isFieldValue": true
                                    },
                                    "idDates": {
                                        "initial": null,
                                        "value": null,
                                        "_isFieldValue": true
                                    }
                                }
                            })
                        };
                    break;
                 case ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_HAVE_TO_KNOW:
                     if(!action.data)
                         return state;
                     else
                         return {
                             ...state,
                             haveToKnow: state.haveToKnow.map( (portion, portionIndex) => {
                                 if(portionIndex != action.resPortionIndex)
                                     return portion;
                                 return {
                                     "portionStartDate": {
                                         "initial": null,
                                         "value": null,
                                         "_isFieldValue": true
                                     },
                                     "portionEndDate": {
                                         "initial": null,
                                         "value": null,
                                         "_isFieldValue": true
                                     },
                                     "text": {
                                         "initial": "",
                                         "value": action.data.text,
                                         "_isFieldValue": true
                                     },
                                     "idText": {
                                         "initial": null,
                                         "value": action.data.idText,
                                         "_isFieldValue": true
                                     },
                                     "idDates": {
                                         "initial": null,
                                         "value": null,
                                         "_isFieldValue": true
                                     }
                                 }
                             })
                         };
                     break;
                case ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_QUALIFF_REQUIR:
                    if(!action.data)
                        return state;
                    else
                        return {
                            ...state,
                            qualiffRequir: state.qualiffRequir.map( (portion, portionIndex) => {
                                if(portionIndex != action.resPortionIndex)
                                    return portion;
                                return {
                                    "portionStartDate": {
                                        "initial": null,
                                        "value": null,
                                        "_isFieldValue": true
                                    },
                                    "portionEndDate": {
                                        "initial": null,
                                        "value": null,
                                        "_isFieldValue": true
                                    },
                                    "text": {
                                        "initial": "",
                                        "value": action.data.text,
                                        "_isFieldValue": true
                                    },
                                    "idText": {
                                        "initial": null,
                                        "value": action.data.idText,
                                        "_isFieldValue": true
                                    },
                                    "idDates": {
                                        "initial": null,
                                        "value": null,
                                        "_isFieldValue": true
                                    }
                                }
                            })
                        };
                    break;
                default:
                    return state;
            }


        case ADD_NEW_OCCUP_CLARIFICATION_INP_CHANGE:
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
                            state.name.clarifiedOccup.value == null ? "" : state.clarifiedOccupTextVal,
                            action.newVal.textValue
                        )
                    },
                    occupationNameMin: {
                        ...state.name.occupationNameMin,
                        value: calcNewOccupationNameVal(
                            state.name.occupationNameMin.value,
                            state.name.clarifiedOccup.value == null ? "" : state.clarifiedOccupTextVal,
                            action.newVal.textValue
                        )
                    }
                },
                clarificationTextVal: action.newVal.textValue    //потрібно щоб порахувати occupationName
            };
        case ADD_NEW_OCCUP_CLARIFIED_OCCUP_INP_CHANGE:
            return {
                ...state,
                name: {
                    ...state.name,
                    occupationName: {
                        ...state.name.occupationName,
                        value: calcNewOccupationNameVal(
                            state.name.occupationName.value,
                            action.newVal.id == null ? "" : action.newVal.textValue,    //якщо відсутня уточнювана посада
                            state.clarificationTextVal
                        )
                    },
                    occupationNameMin: {
                        ...state.name.occupationNameMin,
                        value: calcNewOccupationNameVal(
                            state.name.occupationNameMin.value,
                            action.newVal.id == null ? "" : action.newVal.textValue,    //якщо відсутня уточнювана посада
                            state.clarificationTextVal
                        )
                    }
                },
                clarifiedOccupTextVal: action.newVal.textValue    //потрібно щоб порахувати occupationName
            };

        case ADD_NEW_OCCUP_OCCUPATION_GROUP_INP_CHANGE: //TODO
        default:
            return state;
    }
}