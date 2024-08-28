import React, { useContext } from "react";

import styles from "./CalendarWindow.module.css";
import Days from "./subcomponents/Days/Days";

import { DisplayMonthContext } from "../../../../../src/App";

const CalendarWindow = () => {
  const { displayMonth, setDisplayMonth } = useContext(DisplayMonthContext);

  function getNextMonth(date) {
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    return nextMonth;
  }

  function getPastMonth(date) {
    const pastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    return pastMonth;
  }

  return (
    <div className={styles.CenterContainer}>
      <div className={styles.CalendarRoot}>
        <div className={styles.CalendarWindow}>
          <div className={`${styles.LeftArrow}`}>
            <img
              className={`${styles.ArrowButton}`}
              src="front_end\src\assets\General\triangle_left.svg"
              onClick={() => {
                setDisplayMonth(getPastMonth(displayMonth));
              }}
            />
          </div>

          <h2 className={`${styles.DayTitle} ${styles.GridItem}`}>Sunday</h2>
          <h2 className={`${styles.DayTitle} ${styles.GridItem}`}>Monday</h2>
          <h2 className={`${styles.DayTitle} ${styles.GridItem}`}>Tuesday</h2>
          <h2 className={`${styles.DayTitle} ${styles.GridItem}`}>Wednesday</h2>
          <h2 className={`${styles.DayTitle} ${styles.GridItem}`}>Thursday</h2>
          <h2 className={`${styles.DayTitle} ${styles.GridItem}`}>Friday</h2>
          <h2 className={`${styles.DayTitle} ${styles.GridItem}`}>Saturday</h2>

          <div className={`${styles.RightArrow}`}>
            <img
              className={`${styles.ArrowButton}`}
              src="front_end\src\assets\General\triangle_right.svg"
              onClick={() => {
                setDisplayMonth(getNextMonth(displayMonth));
              }}
            />
          </div>

          <div className={`${styles.SeperatorBar}`} />

          {/* Days */}
          <Days />
        </div>
      </div>
    </div>
  );
};

export default CalendarWindow;
