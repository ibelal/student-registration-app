import * as actions from './action'
const INITIAL_STATE = {
    students: []
}

const studentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actions.SET_STUDENTS:
            return {
                ...state,
                students: action.payload
            }
        case actions.GET_STUDENT:
            return {
                ...state,
                students: state.students.filter(x => x.id === action.payload)
            }
        case actions.GET_ALL_STUDENTS:
            return {
                ...state,
                students: state.students
            }
        case actions.ADD_STUDENT:
            return {
                ...state,
                students: [...state.students, { ...action.payload }]
            }
        case actions.UPDATE_STUDENT:
            return {
                ...state,
                students: state.students.map(x => x.id === action.payload.id ? { ...action.payload } : { ...x })
            }

        default: return state
    }
}

export default studentReducer