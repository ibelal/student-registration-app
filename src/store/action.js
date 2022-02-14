export const SET_ROLE = "SET_ROLE"
export const SET_STUDENTS = "SET_STUDENTS"
export const GET_STUDENT = "GET_STUDENT"
export const GET_ALL_STUDENTS = "GET_ALL_STUDENTS"
export const ADD_STUDENT = "Add_STUDENT"
export const UPDATE_STUDENT = "UPDATE_STUDENT"
export const SET_COUNTRIES = "SET_COUNTRIES"

export const updateRole = payload => { return { type: SET_ROLE, payload } }
export const updateCountries = payload => { return { type: SET_COUNTRIES, payload } }
export const setStudents = payload => { return { type: SET_STUDENTS, payload } }
export const getStudent = payload => { return { type: GET_STUDENT, payload } }
export const getAllStudents = payload => { return { type: GET_ALL_STUDENTS, payload } }
export const addStudent = payload => { return { type: ADD_STUDENT, payload } }
export const updateStudent = payload => { return { type: UPDATE_STUDENT, payload } }