import React, { useContext } from "react";

import styles from "./CalendarLabel.module.css";

import { shortenEmail } from "../../../../utils/friendUtils";
import { EventsDataContext, UserDataContext } from "../../../../src/App";
import { getFromServer, postToServer } from "../../../../utils/dataBaseUtils";
import { UserButton } from "@clerk/clerk-react";

const CalendarLabel = ({ calendarEmail }) => {
  const { setEventsData } = useContext(EventsDataContext);
  const { userData, setUserData } = useContext(UserDataContext);

  const switchCalendar = async (event) => {
    event.preventDefault();

    // Request for the switched calendar's data.

    const res = await postToServer({
      linkExtender: `/api/user-data/${userData.user.id}/events`,
      bodyData: { userEmail: calendarEmail },
    });
    console.log(res);

    setUserData({
      ...userData,
      members: res.members,
      curCalendar: calendarEmail,
    });
    setEventsData(res.eventsData);
  };

  return (
    <form className={styles.CalendarLabel} onSubmit={switchCalendar}>
      <p className={styles.CalendarEmail}>{shortenEmail(calendarEmail)}</p>
      <div>
        <button className={styles.SwitchButton} type="submit">
          ⇄
        </button>
      </div>
    </form>
  );
};

export default CalendarLabel;
