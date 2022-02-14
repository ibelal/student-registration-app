import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'

import Modal from "./Modal"


const ListStudent = () => {
    const [viewId, setViewId] = useState(null);
    const studentData = useSelector(state => state.studentData)
    const countries = useSelector(state => state.countries)

    const studentList = studentData && studentData.students
    const viewStudent = (student) => {
        setViewId(student)
    }

    useEffect(() => {
    }, [viewId])

    let rowContent = <tr><td colSpan="6">No data found.</td></tr>
    rowContent = studentList && studentList.length > 0 && studentList.map((student, i) => {
        const country = countries && countries.find(x => x.code === student.nationality)
        return (
            <tr key={i}>
                <td>{i + 1}</td>
                <td>{student.firstName}</td>
                <td>{`${student.lastName}  - ${student.relatives.map(x => x.relativeName).join(", ")}`}</td>
                <td>{new Date(student.dob).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}</td>
                <td>{country && country.name ? country.name : ""}</td>
                <td><a role="button" data-bs-toggle="modal" data-bs-target="#addStudent" onClick={() => viewStudent(student.id)} >View</a></td>
            </tr>
        )
    })

    return (
        <div>
            <h2>List Student</h2>
            <button type="button"
                onClick={() => viewStudent(null)}
                className="btn btn-outline-success float-end" data-bs-toggle="modal" data-bs-target="#addStudent">
                Add New Student
            </button>

            <Modal
                modalId="addStudent"
                title={`${viewId !== null ? 'View Student Details' : 'Add New Student'}`}
                content={viewId}
            />

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">DOB</th>
                        <th scope="col">Nationality</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rowContent}
                </tbody>
            </table>
        </div>
    )
}

export default ListStudent