import {
    EDIT_OCCUP_SUBMIT_REQUEST,
    EDIT_OCCUP_SUBMIT_FAIL,
    EDIT_OCCUP_SUBMIT_SUCCESS,

    EDIT_OCCUP_HIDE_SERVER_RESP_MSG,

    EDIT_OCCUP_OCCUPATION_GROUP_INP_CHANGE,
    EDIT_OCCUP_CLARIFICATION_INP_CHANGE,
    EDIT_OCCUP_CLARIFIED_OCCUP_INP_CHANGE,

    EDIT_OCCUP_INP_IS_VIRTUAL_CHANGE
} from '../constants/modalEditOccup'

import {
    ADD_INFO_FROM_ANOTHER_OCCUPATION,
    ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_CODES,
    ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_RESPONSIBLITIES,
    ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_HAVE_TO_KNOW,
    ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_QUALIFF_REQUIR
} from '../constants/addingInfoFromAnotherOccup'

import { SHOW_MODAL_EDIT_OCCUP } from '../constants/modalEditOccup'

// function calcNewOccupationNameVal(oldVal, clarifiedOccupTextVal, clarificationTextVal) {
//     if(clarifiedOccupTextVal && clarificationTextVal)
//         return clarifiedOccupTextVal + " " + clarificationTextVal;
//     if(clarifiedOccupTextVal)
//         return clarifiedOccupTextVal;
//     if(clarificationTextVal)
//         return clarificationTextVal;
//     return oldVal;
// }

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
            switch(action.resultsType){
                case ADDING_INFO_FROM_ANOTHER_OCCUPATION_TYPE_CODES:
                    if(!action.data || !action.data.codes instanceof Array)
                        return state;
                    else
                        return {
                            ...state,
                            codes: action.data.codes.map(portion => {
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
                                        "initial": null,
                                        "value": action.data.text,
                                        "_isFieldValue": true
                                    },
                                    "id": {
                                        "initial": null,
                                        "value": action.data.id,
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
                                         "initial": null,
                                         "value": action.data.text,
                                         "_isFieldValue": true
                                     },
                                     "id": {
                                         "initial": null,
                                         "value": action.data.id,
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
                                        "initial": null,
                                        "value": action.data.text,
                                        "_isFieldValue": true
                                    },
                                    "id": {
                                        "initial": null,
                                        "value": action.data.id,
                                        "_isFieldValue": true
                                    }
                                }
                            })
                        };
                    break;
                default:
                    return state;
            }


        case SHOW_MODAL_EDIT_OCCUP:
            return {
                ...state,
                name: {
                    'occupationGroup': {
                        "initial": null,
                        "value": action.editingData.data.occupationGroup || null,
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
                features: {
                    'isIndependent': {
                        "initial": null,
                        "value": action.editingData.data.isIndependent || false,
                        "_isFieldValue": true
                    },
                    'isVirtual': {
                        "initial": null,
                        "value": action.editingData.data.virtual || false,
                        "_isFieldValue": true
                    }
                },
                duration: {
                    'creatingInStateDate': {
                        "initial": null,
                        "value": action.editingData.data.creatingInStateDate || null,
                        "_isFieldValue": true
                    },
                    'creatingInKPIDate': {
                        "initial": null,
                        "value": action.editingData.data.creatingInKPIDate || null,
                        "_isFieldValue": true
                    }
                },
                codes: action.editingData.data.codes.map( portion => {
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
                }),
                responsibilities: action.editingData.data.responsibilities.map( portion => {
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
                            "initial": null,
                            "value": portion.text,
                            "_isFieldValue": true
                        },
                        "id": {
                            "initial": null,
                            "value": portion.id,
                            "_isFieldValue": true
                        }
                    }
                }),
                haveToKnow: action.editingData.data.haveToKnow.map( portion => {
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
                            "initial": null,
                            "value": portion.text,
                            "_isFieldValue": true
                        },
                        "id": {
                            "initial": null,
                            "value": portion.id,
                            "_isFieldValue": true
                        }
                    }
                }),
                qualiffRequir: action.editingData.data.qualiffRequir.map( portion => {
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
                            "initial": null,
                            "value": portion.text,
                            "_isFieldValue": true
                        },
                        "id": {
                            "initial": null,
                            "value": portion.id,
                            "_isFieldValue": true
                        }
                    }
                })
            };


        case EDIT_OCCUP_INP_IS_VIRTUAL_CHANGE:
            //якщо не обрано варіант "є віртуальною посадою"
            if(!action.newVal || action.newVal == "false") {
                if(state.codes && state.codes.length)
                    return state;
                else
                    return {
                        ...state,
                        codes: [
                            {
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
                                    "value": null,
                                    "_isFieldValue": true
                                },
                                "codeETDK": {
                                    "initial": null,
                                    "value": null,
                                    "_isFieldValue": true
                                },
                                "codeZKPPTR": {
                                    "initial": null,
                                    "value": null,
                                    "_isFieldValue": true
                                },
                                "codeDKHP": {
                                    "initial": null,
                                    "value": null,
                                    "_isFieldValue": true
                                }
                            }
                        ]
                    };
            }
            else
                return {
                    ...state,
                    codes: []
                };

        // ЗАРАЗ поля Уточнювана посада та Уточнення не показуються, тому ці reducer-и не треба
        // case EDIT_OCCUP_CLARIFICATION_INP_CHANGE:
        //     return {
        //         ...state,
        //         name: {
        //             ...state.name,
        //             clarification: {
        //                 ...state.name.clarification,
        //                 value: action.newVal.id
        //             },
        //             occupationName: {
        //                 ...state.name.occupationName,
        //                 value: calcNewOccupationNameVal(
        //                     state.name.occupationName.value,
        //                     state.name.clarifiedOccup.value == -1 ? "" : state.clarifiedOccupTextVal,
        //                     action.newVal.textValue
        //                 )
        //             },
        //             occupationNameMin: {
        //                 ...state.name.occupationNameMin,
        //                 value: calcNewOccupationNameVal(
        //                     state.name.occupationNameMin.value,
        //                     state.name.clarifiedOccup.value == -1 ? "" : state.clarifiedOccupTextVal,
        //                     action.newVal.textValue
        //                 )
        //             }
        //         },
        //         clarificationTextVal: action.newVal.textValue    //потрібно щоб порахувати occupationName
        //     };
        // case EDIT_OCCUP_CLARIFIED_OCCUP_INP_CHANGE:
        //     return {
        //         ...state,
        //         name: {
        //             ...state.name,
        //             occupationName: {
        //                 ...state.name.occupationName,
        //                 value: calcNewOccupationNameVal(
        //                     state.name.occupationName.value,
        //                     action.newVal.id == -1 ? "" : action.newVal.textValue,    //якщо відсутня уточнювана посада
        //                     state.clarificationTextVal
        //                 )
        //             },
        //             occupationNameMin: {
        //                 ...state.name.occupationNameMin,
        //                 value: calcNewOccupationNameVal(
        //                     state.name.occupationNameMin.value,
        //                     action.newVal.id == -1 ? "" : action.newVal.textValue,    //якщо відсутня уточнювана посада
        //                     state.clarificationTextVal
        //                 )
        //             }
        //         },
        //         clarifiedOccupTextVal: action.newVal.textValue    //потрібно щоб порахувати occupationName
        //     };
        //
        // case EDIT_OCCUP_OCCUPATION_GROUP_INP_CHANGE: //TODO
        default:
            return state;
    }
}