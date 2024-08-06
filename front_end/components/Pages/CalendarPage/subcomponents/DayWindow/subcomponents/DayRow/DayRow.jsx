import React from 'react';

import styles from './DayRow.module.css';
import EventBlock from '../EventBlock/EventBlock';

const DayRow = ( { strRep, hourLabel, timeDivide }) => {
  return ( 
    <>
      <div className={styles.DayRow}>
        <EventBlock/>
        <span className={styles.DayRowText}>{strRep}</span>
      </div>
    </>
   );
}
 
export default DayRow;
