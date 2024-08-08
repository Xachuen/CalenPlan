import { useState, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

/*Components*/
import NavBar from '../components/NavBar/NavBar'
import MainHolder from '../components/MainHolder/MainHolder'

export const DisplayMonthContext = createContext();
export const EventsDataContext = createContext();

function App() {
  const [displayMonth, setDisplayMonth] = useState(new Date());
  const [eventsData, setEventsData] = useState({});

  return (
    <>
      <Router>
        <EventsDataContext.Provider value={ { eventsData, setEventsData } }>
          <DisplayMonthContext.Provider value={ {displayMonth, setDisplayMonth} }>
            <NavBar/>
            <MainHolder/>
          </DisplayMonthContext.Provider>
        </EventsDataContext.Provider>
      </Router>
    </>
  )
}

export default App
