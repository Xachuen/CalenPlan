import React from 'react';

import styles from './CalendarWindow.module.css';

const CalendarWindow = () => {
  return (
    <div className={styles.CenterContainer}>
      <div className={styles.CalendarRoot}>
        <div className={styles.CalendarWindow}>
          {/* TODO: Wrap these arrows in div. */}
          <img className={`${styles.ArrowButton} ${styles.LeftArrow}`} src='front_end\src\assets\General\triangle_left.svg'></img>
          <h2 className={`${styles.DayTitle} ${styles.GridItem}`}>Sunday</h2>
          <h2 className={`${styles.DayTitle} ${styles.GridItem}`}>Monday</h2>
          <h2 className={`${styles.DayTitle} ${styles.GridItem}`}>Tuesday</h2>
          <h2 className={`${styles.DayTitle} ${styles.GridItem}`}>Wednesday</h2>
          <h2 className={`${styles.DayTitle} ${styles.GridItem}`}>Thursday</h2>
          <h2 className={`${styles.DayTitle} ${styles.GridItem}`}>Friday</h2>
          <h2 className={`${styles.DayTitle} ${styles.GridItem}`}>Saturday</h2>
          <img className={`${styles.ArrowButton} ${styles.RightArrow}`} src='front_end\src\assets\General\triangle_right.svg'></img>

          {/* Days */}

          <div className={`${styles.DayItem} ${styles.GridItem}`}>

          </div>
          <div className={`${styles.DayItem} ${styles.GridItem}`}>

          </div>
        </div>
      </div>
    </div>
   );
}
 
export default CalendarWindow;