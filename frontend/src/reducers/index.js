import { combineReducers } from 'redux'
import modals from './modals'
import user from './user'
import { routerReducer } from 'react-router-redux'
import formAddNewOccup from './formAddNewOccup'
import formEditOccup from './formEditOccup'
import delOccupation from "./delOccupation"
import occupationNameInfo from './occupationNameInfo'
import occupCodesLists from './occupCodesLists'
import searchOccupBox from './searchOccupBox'
import {reducer as formReducer} from 'redux-form'

export const rootReducer = combineReducers({
    routing: routerReducer,
    user,
    occupationNameInfo,
    occupCodesLists,
    modals,
    searchOccupBox,
    delOccupation,
    form: formReducer.plugin({
        addForm: formAddNewOccup,
        formEditOccup: formEditOccup
    })
});

// export function rootReducer(state = {}, action) {
//     return {
//         user: user(state.user, action),
//         occupationNameInfo: occupationNameInfo(state.occupationNameInfo, action),
//         form: formAddNewOccup(formReducer(state.form, action), action)
//     }
// }


