import { combineReducers } from 'redux'
import modals from './modals'
import user from './user'
import addOccupForm from './addOccupForm'
import delOccupation from "./delOccupation"
import occupationNameInfo from './occupationNameInfo'
import occupCodesLists from './occupCodesLists'
import searchOccupBox from './searchOccupBox'
import {reducer as formReducer} from 'redux-form'

export const rootReducer = combineReducers({
    modals,
    user,
    searchOccupBox,
    delOccupation,
    occupationNameInfo,
    occupCodesLists,
    form: formReducer.plugin({
        addForm: addOccupForm
    })
});

// export function rootReducer(state = {}, action) {
//     return {
//         user: user(state.user, action),
//         occupationNameInfo: occupationNameInfo(state.occupationNameInfo, action),
//         form: addOccupForm(formReducer(state.form, action), action)
//     }
// }


