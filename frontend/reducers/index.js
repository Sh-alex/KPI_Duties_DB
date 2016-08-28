import { combineReducers } from 'redux'
import user from './user'
import addOccupForm from './addOccupForm'
import occupationNameInfo from './occupationNameInfo'
import {reducer as formReducer} from 'redux-form'

export const rootReducer = combineReducers({
    user,
    occupationNameInfo,
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


