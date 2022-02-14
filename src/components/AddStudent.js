import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_STUDENT, UPDATE_STUDENT } from '../store/action'
import AddRelative from './AddRelative'

const relations = [
    {
        name: "Parent",
        value: "parent"
    },
    {
        name: "Sibling",
        value: "sibling"
    },
    {
        name: "Spouse",
        value: "spouse"
    }
]

const AddStudent = props => {
    const initial_state = {
        id: "",
        firstName: "",
        lastName: "",
        dob: "",
        nationality: "",
        relatives: []
    }
    const [inputField, setInputField] = useState(initial_state)
    const studentData = useSelector(state => state.studentData)
    const role = useSelector(state => state.role)
    const dispatch = useDispatch()
    const disabled = role === "admin" && props.student

    let countries = useSelector(state => state.countries)
    if (countries) {
        countries.sort((a, b) => a.name.localeCompare(b.name))
    }

    useEffect(() => {
        const studentId = props.student
        if (studentId && studentData) {
            let student = studentData.students.find(x => x.id === studentId)
            setInputField(prevState => ({ ...prevState, ...student }))
        } else {
            setInputField(initial_state)
        }
    }, [props.student])

    const onChangeHandler = event => {
        const { name, value } = event.target
        setInputField(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const submitHandler = event => {
        event.preventDefault()
        // dispatch to store
        const studentId = props.student
        let newStudent = inputField
        let id = Math.floor(1000 + Math.random() * 9000);
        if (studentId && studentData) {
            let student = studentData.students.find(x => x.id === studentId)
            if (student) {
                newStudent = {
                    ...newStudent,
                    id: studentId
                }
                dispatch({
                    type: UPDATE_STUDENT,
                    payload: newStudent
                })
            }
        } else {
            newStudent = {
                ...newStudent,
                id
            }
            dispatch({
                type: ADD_STUDENT,
                payload: newStudent
            })
        }
        setInputField({ ...initial_state })
    }

    const createInputArray = () => {
        return inputField && inputField.relatives.map((el, i) =>
            <AddRelative
                modal={inputField.relatives[i]}
                key={i}
                student={props.student}
                index={i}
                disabled={disabled}
                relations={relations}
                countries={countries}
                onChange={onRelativeChangeHandler.bind(el, i)}
                onRemove={removeRelatives}
            />)
    }

    const addRelatives = () => {
        setInputField(prevState => ({
            ...prevState,
            relatives: [
                ...prevState.relatives,
                { ...initial_state }]
        }))
    }

    const removeRelatives = event => {
        const index = event.target.dataset.value
        const currentRelatives = [...inputField.relatives]
        currentRelatives.splice(index, 1)
        setInputField(prevState => ({ ...prevState, relatives: currentRelatives }))
    }

    function onRelativeChangeHandler(index, event) {
        let tempRelative = [...inputField.relatives]
        tempRelative[index] = { ...event }
        setInputField(prevState => ({
            ...prevState,
            relatives: [...tempRelative]
        }))
    }
    const resetForm = () => {
        setInputField({ ...initial_state })
    }

    return (
        <div>
            <div className="mb-3 mt-4 row">
                <form onSubmit={submitHandler}>
                    <div className="accordion" id="accordionAddStudent">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="basicInfor">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Basic Information
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="basicInfor" data-bs-parent="#accordionAddStudent">
                                <fieldset disabled={disabled ? "disabled" : ""}>
                                    <div className="accordion-body">
                                        <div className="col-xs mb-3">
                                            <label htmlFor="firstName" className="form-label">First Name</label>
                                            <input type="text" className="form-control" name="firstName" id="firstName" placeholder="e.g. Jon" onChange={onChangeHandler} value={inputField.firstName} required />
                                        </div>
                                        <div className="col-xs mb-3">
                                            <label htmlFor="lastName" className="form-label">Last Name</label>
                                            <input type="text" className="form-control" name="lastName" id="lastName" placeholder="e.g. Doe" onChange={onChangeHandler} value={inputField.lastName} required />
                                        </div>
                                        <div className="col-xs mb-3">
                                            <label htmlFor="dob" className="form-label">Date of Birth</label>
                                            <input type="date" className="form-control" name="dob" id="dob" placeholder="e.g. Doe" onChange={onChangeHandler} value={inputField.dob} max="2007-12-31" required />
                                        </div>
                                        <div className="col-xs mb-3">
                                            <label htmlFor="nationality" className="form-label">Nationality</label>
                                            <select className="form-select" name="nationality" id="nationality" onChange={onChangeHandler} required="required" value={inputField.nationality}>
                                                <option value="">Select Nationality</option>
                                                {countries && countries.map(country => <option key={country.code} value={country.code}>{country.name}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="familyInfo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Family Information
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="familyInfo" data-bs-parent="#accordionAddStudent">
                                <div className="accordion-body">
                                    <fieldset disabled={disabled ? "disabled" : ""}>
                                        {createInputArray()}
                                        <button type="button" className="btn btn-outline-success" onClick={addRelatives}>
                                            <i className="bi bi-person-plus-fill"></i> Add Relative
                                        </button>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col mt-4">
                        <fieldset disabled={disabled ? "disabled" : ""}>
                            <button type="submit" className="btn btn-outline-primary me-2">
                                <i className="bi bi-send-fill"></i>Submit
                            </button>
                            <button type="reset" className="btn btn-outline-secondary" onClick={resetForm}>
                                <i className="bi bi-x-octagon-fill"></i> Cancel
                            </button>
                        </fieldset>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddStudent