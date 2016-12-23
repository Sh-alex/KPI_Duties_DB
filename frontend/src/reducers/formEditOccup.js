import {
    EDIT_OCCUP_SUBMIT_REQUEST,
    EDIT_OCCUP_SUBMIT_FAIL,
    EDIT_OCCUP_SUBMIT_SUCCESS,

    EDIT_OCCUP_HIDE_SERVER_RESP_MSG,

    EDIT_OCCUP_OCCUPATION_GROUP_INP_CHANGE,
    EDIT_OCCUP_CLARIFICATION_INP_CHANGE,
    EDIT_OCCUP_CLARIFIED_OCCUP_INP_CHANGE,
    EDIT_OCCUP_KP_CODE_INP_CHANGE,
    EDIT_OCCUP_DKHP_CODE_INP_CHANGE,
    EDIT_OCCUP_ZKPPTR_CODE_INP_CHANGE,
    EDIT_OCCUP_ETDK_CODE_INP_CHANGE,
    EDIT_OCCUP_INP_IS_VIRTUAL_CHANGE
} from '../constants/modalEditOccup'

import {
    ADD_INFO_FROM_ANOTHER_OCCUPATION,
    ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_CODES,
    ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_RESPONSIBLITIES,
    ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_HAVE_TO_KNOW,
    ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_QUALIFF_REQUIR
} from '../constants/addingInfoFromAnotherOccup'

import {
    SHOW_MODAL_EDIT_OCCUP,
    FETCH_EDITING_OCCUP_DATA_SUCCESS
} from '../constants/modalEditOccup'

function calcNewOccupationNameVal(clarifiedOccupTextVal, clarificationTextVal) {
    if(clarifiedOccupTextVal && clarificationTextVal)
        return clarifiedOccupTextVal + " " + clarificationTextVal;
    if(clarifiedOccupTextVal)
        return clarifiedOccupTextVal;
    if(clarificationTextVal)
        return clarificationTextVal;
    return "";
}

export default function formEditOccup(state, action) {
    if(state.shouldShowServerRespMsg === undefined)
        return {
            ...state,
            shouldShowServerRespMsg: false
        };
    switch(action.type) {
        case EDIT_OCCUP_SUBMIT_FAIL:
        case EDIT_OCCUP_SUBMIT_SUCCESS:
            return {
                ...state,
                shouldShowServerRespMsg: true
            };
        case EDIT_OCCUP_HIDE_SERVER_RESP_MSG:
        case EDIT_OCCUP_SUBMIT_REQUEST:
        case "redux-form/RESET":
            return {
                ...state,
                _error: "",
                shouldShowServerRespMsg: false
            };

        case ADD_INFO_FROM_ANOTHER_OCCUPATION:
            if(action.resForm !== 'formEditOccup')
                return state;
            let addInfoFromAnotherOccupDescrTextMappingFunc = (portion, portionIndex) => {
                if(portionIndex != action.resPortionIndex)
                    return portion;
                return {
                    "portionStartDate": {
                        "initial": null,
                        "value": action.data.portionStartDate,
                        "_isFieldValue": true
                    },
                    "portionEndDate": {
                        "initial": null,
                        "value": action.data.portionEndDate,
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
                    'updateTextInRelativeOccup': {
                        "initial": -1, 
                        "value": -1,
                        "_isFieldValue": true
                    },
                    'occupationsUsingText': {
                        "initial": "",
                        "value": action.data.usingOccupations && action.data.usingOccupations.join(", ") || "",
                        "_isFieldValue": true
                    },
                    "idDates": {
                        "initial": null,
                        "value": null,
                        "_isFieldValue": true
                    }
                }
            };

            switch(action.resultsType) {
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
                                        "value": portion.portionStartDate,
                                        "_isFieldValue": true
                                    },
                                    "portionEndDate": {
                                        "initial": null,
                                        "value": portion.portionEndDate,
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
                            responsibilities: state.responsibilities.map( addInfoFromAnotherOccupDescrTextMappingFunc )
                        };
                    break;
                case ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_HAVE_TO_KNOW:
                    if(!action.data)
                        return state;
                    else
                        return {
                            ...state,
                            haveToKnow: state.haveToKnow.map( addInfoFromAnotherOccupDescrTextMappingFunc )
                        };
                    break;
                case ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_QUALIFF_REQUIR:
                    if(!action.data)
                        return state;
                    else
                        return {
                            ...state,
                            qualiffRequir: state.qualiffRequir.map( addInfoFromAnotherOccupDescrTextMappingFunc )
                        };
                    break;
                default:
                    return state;
            }


        case SHOW_MODAL_EDIT_OCCUP:
        case FETCH_EDITING_OCCUP_DATA_SUCCESS:
            if(!action.editingData)
                return state;
            let showModalEditOccupDescrTextMappingFunc = portion => {
                return {
                    "portionStartDate": {
                        "initial": null,
                        "value": portion.portionStartDate || null,
                        "_isFieldValue": true
                    },
                    "portionEndDate": {
                        "initial": null,
                        "value": portion.portionEndDate || null,
                        "_isFieldValue": true
                    },
                    "text": {
                        "initial": "",
                        "value": portion.text || "",
                        "_isFieldValue": true
                    },
                    'updateTextInRelativeOccup': {
                        "initial": -1,
                        "value": -1,
                        "_isFieldValue": true
                    },
                    'occupationsUsingText': {
                        "initial": "",
                        "value": portion.usingOccupations && portion.usingOccupations.join(", ") || "",
                        "_isFieldValue": true
                    },
                    "idText": {
                        "initial": null,
                        "value": portion.idText,
                        "_isFieldValue": true
                    },
                    "idDates": {
                        "initial": null,
                        "value": portion.idDates,
                        "_isFieldValue": true
                    }
                }
            };
            return {
                ...state,
                name: {
                    'occupationGroup': {
                        "initial": null,
                        "value": action.editingData.data.occupationGroup || null,
                        "_isFieldValue": true
                    },
                    'clarifiedOccup': {
                        "initial": null,
                        "value": action.editingData.data.clarifiedOccup || null,
                        "_isFieldValue": true
                    },
                    'clarification': {
                        "initial": null,
                        "value": action.editingData.data.clarification || null,
                        "_isFieldValue": true
                    },
                    'occupationName': {
                        "initial": null,
                        "value": action.editingData.data.occupationName || "",
                        "_isFieldValue": true
                    },
                    'occupationNameMin': {
                        "initial": null,
                        "value": action.editingData.data.occupationNameMin || "",
                        "_isFieldValue": true
                    }
                },
                mainInfoDocRef: {
                    docName: action.editingData.data.mainInfoDocRefName || "",
                    docLink: action.editingData.data.mainInfoDocRefLink || "",
                },
                descriptionDocRef: {
                    docName: action.editingData.data.descriptionDocRefName || "",
                    docLink: action.editingData.data.descriptionDocRefLink || "",
                },
                durations: action.editingData.data.durations.map( portion => {
                    return {
                        'id': {
                            "initial": null,
                            "value": portion.id || null,
                            "_isFieldValue": true
                        },
                        'start': {
                            "initial": null,
                            "value": portion.start || null,
                            "_isFieldValue": true
                        },
                        'stop': {
                            "initial": null,
                            "value": portion.stop || null,
                            "_isFieldValue": true
                        },
                        'inKpi': {
                            "initial": null,
                            "value": portion.inKpi || false,
                            "_isFieldValue": true
                        },
                        'virtual': {
                            "initial": null,
                            "value": portion.virtual || false,
                            "_isFieldValue": true
                        }
                    }
                }),
                codes: (action.editingData.data.codes.length ? action.editingData.data.codes : new Array(1)).map( portion => {
                    return {
                        "id": {
                            "initial": null,
                            "value": portion.id || null,
                            "_isFieldValue": true
                        },
                        "portionStartDate": {
                            "initial": null,
                            "value": portion.portionStartDate || null,
                            "_isFieldValue": true
                        },
                        "portionEndDate": {
                            "initial": null,
                            "value": portion.portionEndDate || null,
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
                            "initial": "",
                            "value": portion.codeKP ? portion.codeKP.val : "",
                            "_isFieldValue": true,
                        },
                        "codeETDKText": {
                            "initial": "",
                            "value": portion.codeETDK ? portion.codeETDK.val : "",
                            "_isFieldValue": true
                        },
                        "codeZKPPTRText": {
                            "initial": "",
                            "value": portion.codeZKPPTR ? portion.codeZKPPTR.val : "",
                            "_isFieldValue": true
                        },
                        "codeDKHPText": {
                            "initial": "",
                            "value": portion.codeDKHP ? portion.codeDKHP.val : "",
                            "_isFieldValue": true
                        }
                    }
                }),
                responsibilities: action.editingData.data.responsibilities.map( showModalEditOccupDescrTextMappingFunc ),
                haveToKnow: action.editingData.data.haveToKnow.map( showModalEditOccupDescrTextMappingFunc ),
                qualiffRequir: action.editingData.data.qualiffRequir.map( showModalEditOccupDescrTextMappingFunc )
            };


        case EDIT_OCCUP_CLARIFICATION_INP_CHANGE:
            if(state.name && state.name.clarification)
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
                                !state.name.clarifiedOccup.value ? "" : state.clarifiedOccupTextVal,
                                action.newVal.textValue
                            )
                        },
                        occupationNameMin: {
                            ...state.name.occupationNameMin,
                            value: calcNewOccupationNameVal(
                                !state.name.clarifiedOccup.value ? "" : state.clarifiedOccupTextVal,
                                action.newVal.textValue
                            )
                        }
                    },
                    clarificationTextVal: action.newVal.textValue    //потрібно щоб порахувати occupationName
                };
            else {
                console.log("Called EDIT_OCCUP_CLARIFICATION_INP_CHANGE reducer, but state is empty");
                return state;
            }
        case EDIT_OCCUP_CLARIFIED_OCCUP_INP_CHANGE:
            return {
                ...state,
                name: {
                    ...state.name,
                    clarification: {
                        ...state.name.clarification,
                        value: !action.newVal.id ? state.name.clarification.value : ""  //якщо відсутня уточнювана посада, залишаємо уточнення, інакше обнуляємо його
                    },
                    occupationName: {
                        ...state.name.occupationName,
                        value: calcNewOccupationNameVal(
                            !action.newVal.id ? "" : action.newVal.textValue,    //якщо відсутня уточнювана посада
                            !action.newVal.id ? state.clarificationTextVal : ""  //якщо відсутня уточнювана посада, залишаємо уточнення, інакше обнуляємо його
                        )
                    },
                    occupationNameMin: {
                        ...state.name.occupationNameMin,
                        value: calcNewOccupationNameVal(
                            !action.newVal.id ? "" : action.newVal.textValue,    //якщо відсутня уточнювана посада
                            !action.newVal.id ? state.clarificationTextVal : ""  //якщо відсутня уточнювана посада, залишаємо уточнення, інакше обнуляємо його
                        )
                    }
                },
                clarificationTextVal: !action.newVal.id ? state.clarificationTextVal : "",  //якщо відсутня уточнювана посада, залишаємо уточнення, інакше обнуляємо його
                clarifiedOccupTextVal: action.newVal.textValue    //потрібно щоб порахувати occupationName
            };


        case EDIT_OCCUP_OCCUPATION_GROUP_INP_CHANGE:
            if(state.name && state.name.occupationGroup)
                return {
                    ...state,
                    name: {
                        ...state.name,
                        occupationGroup: {
                            ...state.name.occupationGroup,
                            value: action.newVal && action.newVal.id || 0
                        },
                    }
                };
        else {
            console.log("Called EDIT_OCCUP_OCCUPATION_GROUP_INP_CHANGE reducer, but state is empty");
            return state;
        }


        case EDIT_OCCUP_KP_CODE_INP_CHANGE:
            return {
                ...state,
                codes: state.codes.map( (portion, portionIndex) => {
                    if(portionIndex != action.resPortionIndex)
                        return portion;
                    return {
                        ...portion,
                        "codeKP": {
                            "initial": null,
                            "value": action.newVal && action.newVal.id || null,
                            "_isFieldValue": true,
                        },
                        "codeKPText": {
                            "initial": null,
                            "value": action.newVal && action.newVal.textValue || null,
                            "_isFieldValue": true,
                        },
                    }
                })
            };
            break;
        case EDIT_OCCUP_DKHP_CODE_INP_CHANGE:
            return {
                ...state,
                codes: state.codes.map( (portion, portionIndex) => {
                    if(portionIndex != action.resPortionIndex)
                        return portion;
                    return {
                        ...portion,
                        "codeDKHP": {
                            "initial": null,
                            "value": action.newVal && action.newVal.id || null,
                            "_isFieldValue": true
                        },
                        "codeDKHPText": {
                            "initial": null,
                            "value": action.newVal && action.newVal.textValue || null,
                            "_isFieldValue": true
                        }
                    }
                })
            };
            break;
        case EDIT_OCCUP_ZKPPTR_CODE_INP_CHANGE:
            return {
                ...state,
                codes: state.codes.map( (portion, portionIndex) => {
                    if(portionIndex != action.resPortionIndex)
                        return portion;
                    return {
                        ...portion,
                        "codeZKPPTR": {
                            "initial": null,
                            "value": action.newVal && action.newVal.id || null,
                            "_isFieldValue": true
                        },
                        "codeZKPPTRText": {
                            "initial": null,
                            "value": action.newVal && action.newVal.textValue || null,
                            "_isFieldValue": true
                        }
                    }
                })
            };
            break;
        case EDIT_OCCUP_ETDK_CODE_INP_CHANGE:
            return {
                ...state,
                codes: state.codes.map( (portion, portionIndex) => {
                    if(portionIndex != action.resPortionIndex)
                        return portion;
                    return {
                        ...portion,
                        "codeETDK": {
                            "initial": null,
                            "value": action.newVal && action.newVal.id || null,
                            "_isFieldValue": true
                        },
                        "codeETDKText": {
                            "initial": null,
                            "value": action.newVal && action.newVal.textValue || null,
                            "_isFieldValue": true
                        },
                    }
                })
            };
            break;

        default:
            return state;
    }
}