import { combineReducers } from 'redux'
import addInfoFromAnotherOccup from './addInfoFromAnotherOccup'
import editOccup from "./modalEditOccup"

export default combineReducers({
    addInfoFromAnotherOccup,
    editOccup
});

