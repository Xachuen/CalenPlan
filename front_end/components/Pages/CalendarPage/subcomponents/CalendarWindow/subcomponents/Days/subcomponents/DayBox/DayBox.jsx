import React from 'react';

import styles from './DayBox.module.css';

const DayBox = ( { dayNumber, colorDisplay }) => {
  return ( 
    <div className={`${styles.DayBox} ${styles[colorDisplay]}`}>
      {dayNumber}
    </div>
   );
}
 
export default DayBox;
