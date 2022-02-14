import { combineReducers } from "redux";
import { SET_COUNTRIES, SET_ROLE } from "./action";
import studentReducer from "./studentReducer";

const INITIAL_ROLE = 'admin'
const INITIAL_COUNTRIES = []

const roleReducer = (state = INITIAL_ROLE, action) => {
    switch (action.type) {
        case SET_ROLE:
            return action.payload

        default: return state
    }
}
const countryReducer = (state = INITIAL_COUNTRIES, action) => {
    switch (action.type) {
        case SET_COUNTRIES:
            return action.payload

        default: return state
    }
}

const rootReducer = combineReducers({
    countries: countryReducer,
    role: roleReducer,
    studentData: studentReducer,
})

export default rootReducer