import React, { useContext } from "react";

import styles from "./DayBox.module.css";
import { useNavigate } from "react-router-dom";

import {
  DisplayMonthContext,
  EventsDataContext,
  UserDataContext,
} from "../../../../../../../../../src/App";
import { putInServer } from "../../../../../../../../../utils/dataBaseUtils.js";

const DayBox = ({
  date_id,
  dateObj,
  dayNumber,
  colorDisplay,
  isCurrentDay,
}) => {
  const navigate = useNavigate();
  const { displayMonth, setDisplayMonth } = useContext(DisplayMonthContext);
  const { eventsData, setEventsData } = useContext(EventsDataContext);

  const {
    userData: { user },
  } = useContext(UserDataContext);
  return (
    <div
      className={`${isCurrentDay ? styles.CurrentDay : ""} ${styles.DayBox} ${styles[colorDisplay]}`}
      onClick={async () => {
        console.log(typeof dateObj);

        // If the user has no seen it, then update the list to show that they have.
        if (
          eventsData[date_id] &&
          !eventsData[date_id]["seen"].includes(user.id)
        ) {
          const updatedSeen = [...eventsData[date_id]["seen"], user.id];

          const updatedEventsData = {
            ...eventsData,
            [date_id]: {
              ...(eventsData[date_id] || {}),
              seen: updatedSeen,
            },
          };

          setEventsData(updatedEventsData);

          putInServer({
            bodyData: {
              userId: user.id,
              calendar_data: updatedEventsData,
            },
          });
        }

        setDisplayMonth(dateObj);
        navigate("/day-view");
      }}
    >
      {dayNumber}
      {eventsData[date_id] && (
        <div
          className={styles.CircleIcon}
          src="front_end\src\assets\General\circle.svg"
        />
      )}
      {eventsData[date_id] &&
        !eventsData[date_id]["seen"].includes(user.id) && (
          <div className={styles.notification}>!</div>
        )}
    </div>
  );
};

export default DayBox;
