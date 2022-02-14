const Sidebar = props => {
    const onClickHandler = event => {
        props.onClickSidebar(event.target.dataset.value)
    }
    const activeClass = activeItem => {
        if (activeItem === props.activeMenu) {
            return "active"
        }
        return null
    }

    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className={`nav-link ${activeClass("dashboard")}`} data-value="dashboard" role="button" onClick={onClickHandler}>
                            <i className="bi bi-house-door-fill"></i>
                            Dashboard
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${activeClass("listStudent")}`} role="button" data-value="listStudent" onClick={onClickHandler}>
                            <i className="bi bi-person-lines-fill"></i>
                            List User
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Sidebar