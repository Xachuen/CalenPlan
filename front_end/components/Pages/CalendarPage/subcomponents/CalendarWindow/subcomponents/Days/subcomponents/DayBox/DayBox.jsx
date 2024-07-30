import React from 'react';

import styles from './DayBox.module.css';

const DayBox = ( { dayNumber, colorDisplay, isCurrentDay }) => {
  return ( 
    <div className={`${isCurrentDay ? styles.CurrentDay : ''} ${styles.DayBox} ${styles[colorDisplay]}`}>
      {dayNumber}
    </div>
   );
}
 
export default DayBox;
