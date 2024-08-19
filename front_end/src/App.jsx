import { useState, createContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

/*Components*/
import NavBar from '../components/NavBar/NavBar'
import MainHolder from '../components/MainHolder/MainHolder'
import { useUser } from '@clerk/clerk-react';
import { getFromServer } from '../utils/dataBaseUtils';

export const DisplayMonthContext = createContext();
export const EventsDataContext = createContext();
export const UserDataContext = createContext();

function App() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [displayMonth, setDisplayMonth] = useState(new Date());
  const [eventsData, setEventsData] = useState({});
  const [ userData, setUserData ] = useState({ isSignedIn, user, isLoaded });

  useEffect(() => {
    if (user && isSignedIn && isLoaded) {
      console.log("Success")
      // If the user is signed in, we want to get the data from
      // the database.
      console.log(`setting user to: ${user.id}`);
      setUserData({ isSignedIn, user, isLoaded });
      
      console.log(user);
      const fetchData = async () => {
        try {
          const responseData = await getFromServer({
            linkExtender: `/api/user-data?userId=${user.id}`
          });
          if (responseData) {
            setEventsData(responseData.calendar_data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();

    }
    else {
      console.log("nope")
      console.log(`user: ${user}, isSigned: ${isSignedIn}`)
    }
   }, [isSignedIn, user, isLoaded]);

  return (
    <>
      <Router>
        <UserDataContext.Provider value={userData}>
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
