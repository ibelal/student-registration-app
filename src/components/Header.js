import { useDispatch, useSelector } from "react-redux"
import { updateRole } from "../store/action"

const Header = () => {
    const seletedRole = useSelector(state => state.role)
    const dispatch = useDispatch()
    const onChangeHandler = event => {
        dispatch(updateRole(event.target.value))
    }

    return (
        <nav className="navbar fixed-top navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand">Student Registration</a>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <form className="d-flex">
                    <select className="form-select" onChange={onChangeHandler}>
                        <option value="admin" defaultValue={seletedRole} >Admin</option>
                        <option value="registrar" defaultValue={seletedRole}>Registrar</option>
                    </select>
                </form>
            </div>
        </nav>
    )
}

export default Header