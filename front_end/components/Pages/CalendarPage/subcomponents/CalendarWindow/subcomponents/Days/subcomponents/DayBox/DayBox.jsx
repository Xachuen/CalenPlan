import React from 'react';

import styles from './DayBox.module.css';

const DayBox = ( { dayNumber }) => {
  return ( 
    <div className={`${styles.DayBox}`}>
      {dayNumber}
    </div>
   );
}
 
export default DayBox;
