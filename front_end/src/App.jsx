import { useState, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'



/*Components*/
import NavBar from '../components/NavBar/NavBar'
import MainHolder from '../components/MainHolder/MainHolder'

export const DisplayMonthContext = createContext();

function App() {
  const [displayMonth, setDisplayMonth] = useState(new Date());

  return (
    <>
      <Router>
        <DisplayMonthContext.Provider value={ {displayMonth, setDisplayMonth} }>
          <NavBar/>
          <MainHolder/>
        </DisplayMonthContext.Provider>
      </Router>
    </>
  )
}

export default App
