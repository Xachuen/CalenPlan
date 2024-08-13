import { useState, createContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

/*Components*/
import NavBar from '../components/NavBar/NavBar'
import MainHolder from '../components/MainHolder/MainHolder'
import { useUser } from '@clerk/clerk-react';

export const DisplayMonthContext = createContext();
export const EventsDataContext = createContext();
export const UserDataContext = createContext();

function App() {
  const { isSigned, user, isLoaded } = useUser();
  const [displayMonth, setDisplayMonth] = useState(new Date());
  const [eventsData, setEventsData] = useState({});

  // useEffect(() => {
    
  // }, []);

  return (
    <>
      <Router>
        <UserDataContext.Provider value = { { isSigned, user, isLoaded } }>
          <EventsDataContext.Provider value={ { eventsData, setEventsData } }>
            <DisplayMonthContext.Provider value={ {displayMonth, setDisplayMonth} }>
              <NavBar/>
              <MainHolder/>
            </DisplayMonthContext.Provider>
          </EventsDataContext.Provider>
          </UserDataContext.Provider>
      </Router>
    </>
  )
}

export default App
