import { useState, createContext, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

/*Components*/
import NavBar from "../components/NavBar/NavBar";
import MainHolder from "../components/MainHolder/MainHolder";
import { useUser } from "@clerk/clerk-react";
import {
  getFromServer,
  postToServer,
  putInServer,
} from "../utils/dataBaseUtils.js";

import { io } from "socket.io-client";

export const DisplayMonthContext = createContext();
export const EventsDataContext = createContext();
export const UserDataContext = createContext();
export const FriendsContext = createContext();
export const SocketContext = createContext();

function App() {
  const socket = useRef();

  const { isSignedIn, user, isLoaded } = useUser();

  const [displayMonth, setDisplayMonth] = useState(new Date());
  const [eventsData, setEventsData] = useState({});
  const [userData, setUserData] = useState({
    isSignedIn,
    user,
    isLoaded,
    accessedCalendars: [],
    members: [],
    curCalendar: "",
  });
  const [localFriendsList, setLocalFriendsList] = useState([]);
  const [localFriendRequests, setLocalFriendRequests] = useState([]);

  useEffect(() => {
    if (user && isSignedIn && isLoaded) {
      console.log("Success");
      // Connect a socket to the server.
      socket.current = io(import.meta.env.VITE_SERVER_URL);

      // If the user is signed in, we want to get the data from
      // the database.
      console.log(`setting user to: ${user.id}`);

      console.log(user);
      const fetchData = async () => {
        try {
          const responseData = await postToServer({
            linkExtender: `/api/user-data`,
            bodyData: {
              userId: user.id,
              userEmail: user.primaryEmailAddress.emailAddress,
            },
          });

          if (responseData) {
            setUserData({
              isSignedIn,
              user,
              isLoaded,
              accessedCalendars: responseData.accessedCalendars,
              members: responseData.members,
              curCalendar: user.primaryEmailAddress.emailAddress,
              address: responseData.address,
            });
            setEventsData(responseData.calendar_data);

            setLocalFriendsList(responseData.friends);
            setLocalFriendRequests(responseData.friend_requests);

            // Join room.
            socket.current.emit(
              "joinRoom",
              user.primaryEmailAddress.emailAddress
            );
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    } else {
      console.log("nope");
      console.log(`user: ${user}, isSigned: ${isSignedIn}`);
    }
  }, [isSignedIn, user, isLoaded]);

  return (
    <>
      {console.log(userData)}
      <Router>
        <SocketContext.Provider value={{ socket: socket.current }}>
          <FriendsContext.Provider
            value={{
              localFriendsList,
              setLocalFriendsList,
              localFriendRequests,
              setLocalFriendRequests,
            }}
          >
            <UserDataContext.Provider value={{ userData, setUserData }}>
              <EventsDataContext.Provider value={{ eventsData, setEventsData }}>
                <DisplayMonthContext.Provider
                  value={{ displayMonth, setDisplayMonth }}
                >
                  <NavBar />
                  <MainHolder />
                </DisplayMonthContext.Provider>
              </EventsDataContext.Provider>
            </UserDataContext.Provider>
          </FriendsContext.Provider>
        </SocketContext.Provider>
      </Router>
    </>
  );
}

export default App;
