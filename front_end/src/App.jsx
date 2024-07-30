import { useState, createContext } from 'react'
import './App.css'


/*Components*/
import NavBar from '../components/NavBar/NavBar'
import MainHolder from '../components/MainHolder/MainHolder'


export const DisplayMonthContext = createContext();

function App() {
  const [displayMonth, setDisplayMonth] = useState(new Date());

  return (
    <>
      <DisplayMonthContext.Provider value={ {displayMonth, setDisplayMonth} }>
        <NavBar/>
        <MainHolder/>
      </DisplayMonthContext.Provider>
    </>
  )
}

export default App
