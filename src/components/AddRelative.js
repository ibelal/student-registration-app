import React, { useState, useEffect } from 'react'

const AddRelative = props => {
    const initial_state = {
        relativeName: "",
        relativeType: "",
        relativeNationality: "",
    }

    const [relative, setRelative] = useState(initial_state)

    useEffect(() => {
        const modal = props.modal
        if (modal) {
            setRelative(prevState => ({ ...prevState, ...modal }))
        } else {
            setRelative(initial_state)
        }
    }, [props.modal])

    const onChangeHandler = event => {
        const { name, value } = event.target
        setRelative(prevState => ({
            ...prevState,
            [name]: value
        }))
        const newRelative = { ...relative, [name]: value }
        props.onChange(newRelative, props.index)
    }

    return (
        <React.Fragment>
            <div className="col-xs mb-3">
                <label htmlFor="relativeName" className="form-label">Relative Name</label>
                <input type="text" className="form-control" name="relativeName" id="relativeName" placeholder="e.g. John Doe" onChange={onChangeHandler} value={relative.relativeName} />
            </div>
            <div className="col-xs mb-3">
                <label htmlFor="relativeType" className="form-label">Relation</label>
                <select className="form-select" name="relativeType" id="relativeType"
                    value={relative.relativeType} onChange={onChangeHandler}>
                    <option value="0">Select Relative</option>
                    {props.relations && props.relations.map(relation => <option key={relation.value} value={relation.value}>{relation.name}</option>)}
                </select>
            </div>
            <div className="col-xs mb-3">
                <label htmlFor="relativeNationality" className="form-label">Nationality</label>
                <select className="form-select" name="relativeNationality" id="relativeNationality"
                    value={relative.relativeNationality} onChange={onChangeHandler}>
                    <option value="0">Select Nationality</option>
                    {props.countries && props.countries.map(country => <option key={country.code} value={country.code}>{country.name}</option>)}
                </select>
            </div>
            <div className="col-xs mb-3">
                <button type="button" className="btn btn-outline-danger" data-value={props.index} onClick={props.onRemove}>
                    <i className="bi bi-person-dash-fill"></i> Remove Relative
                </button>
            </div>
            <div className="col-xs mb-3">
                <hr />
            </div>
        </React.Fragment>
    )
}

export default AddRelative