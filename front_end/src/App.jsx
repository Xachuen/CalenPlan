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
  const { isSignedIn, user, isLoaded } = useUser();
  const [displayMonth, setDisplayMonth] = useState(new Date());
  const [eventsData, setEventsData] = useState({});

   useEffect(() => {
    if (user && isSignedIn) {
      console.log("Success")
      // If the user is signed in, we want to get the data from
      // the database.
      fetch(`http://localhost:3000/api/user-data?userId=${user.id}`)
      .then(response => response.json())
      .then(data=>console.log(data))//.then(data => setEventsData(data))
      .catch(error => console.error('Unable to get user data.', error))
    }
    else {
      console.log("nope")
      console.log(`user: ${user}, isSigned: ${isSignedIn}`)
    }
   }, [isSignedIn, user, isLoaded]);

  return (
    <>
      <Router>
        <UserDataContext.Provider value = { { isSignedIn, user, isLoaded } }>
          <EventsDataContext.Provider value={ { eventsData, setEventsData } }>
            <DisplayMonthContext.Provider value={ { displayMonth, setDisplayMonth } }>
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
