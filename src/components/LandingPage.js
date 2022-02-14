import AddStudent from "./AddStudent"
import Dashboard from "./Dashboard"
import ListStudent from "./ListStudent"


const LandingPage = props => {
    let loadContent = ""
    if (props.onLoadComponent === "addStudent") {
        loadContent = <AddStudent />
    } else if (props.onLoadComponent === "listStudent") {
        loadContent = <ListStudent />
    } else {
        loadContent = <Dashboard />
    }

    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-5 pt-5">
            {loadContent}
        </main>
    )
}

export default LandingPage