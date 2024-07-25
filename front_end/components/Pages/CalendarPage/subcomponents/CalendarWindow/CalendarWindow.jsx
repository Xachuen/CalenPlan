import React from 'react';

import styles from './CalendarWindow.module.css';
import Days from './subcomponents/Days/Days';

const CalendarWindow = () => {
  return (
    <div className={styles.CenterContainer}>
      <div className={styles.CalendarRoot}>
        <div className={styles.CalendarWindow}>
          {/* TODO: Wrap these arrows in div. */}
          <div className={`${styles.LeftArrow}`}> 
            <img className={`${styles.ArrowButton}`} src='front_end\src\assets\General\triangle_left.svg'></img>
          </div>

          <h2 className={`${styles.DayTitle} ${styles.GridItem}`}>Sunday</h2>
          <h2 className={`${styles.DayTitle} ${styles.GridItem}`}>Monday</h2>
          <h2 className={`${styles.DayTitle} ${styles.GridItem}`}>Tuesday</h2>
          <h2 className={`${styles.DayTitle} ${styles.GridItem}`}>Wednesday</h2>
          <h2 className={`${styles.DayTitle} ${styles.GridItem}`}>Thursday</h2>
          <h2 className={`${styles.DayTitle} ${styles.GridItem}`}>Friday</h2>
          <h2 className={`${styles.DayTitle} ${styles.GridItem}`}>Saturday</h2>

          <div className={`${styles.RightArrow}`}>
            <img className={`${styles.ArrowButton}`} src='front_end\src\assets\General\triangle_right.svg'></img>
          </div>

          <div className={`${styles.SeperatorBar}`}/>

          {/* Days */}
          <Days/>
        </div>
      </div>
    </div>
   );
}
 
export default CalendarWindow;