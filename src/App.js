import { useState } from 'react'
import { useDispatch } from 'react-redux';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LandingPage from './components/LandingPage';
import { setStudents, updateCountries } from './store/action';
import data from './data.json'

function App() {
  const [activeMenu, setActiveMenu] = useState("dashboard")
  
  const studentList = data && data.students ? data.students : []
  const countries = data && data.countries ? data.countries : []

  const dispatch = useDispatch()
  
  dispatch(setStudents(studentList))
  dispatch(updateCountries(countries))

  const updateMenuActive = menu => {
    setActiveMenu(menu)
  }

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar activeMenu={activeMenu} onClickSidebar={updateMenuActive} />
          <LandingPage onLoadComponent={activeMenu} />
        </div>
      </div>
    </div>
  );
}

export default App;
