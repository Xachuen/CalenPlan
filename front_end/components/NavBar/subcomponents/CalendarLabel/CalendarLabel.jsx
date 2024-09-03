import React from "react";

import styles from "./CalendarLabel.module.css";

import { shortenEmail } from "../../../../utils/friendUtils";

const CalendarLabel = ({ calendarEmail }) => {
  const switchCalendar = () => {};

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
