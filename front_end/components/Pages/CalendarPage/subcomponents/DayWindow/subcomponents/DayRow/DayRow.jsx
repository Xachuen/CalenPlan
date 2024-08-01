import React from 'react';

import styles from './DayRow.module.css';

const DayRow = ( { strRep, hourLabel, timeDivide }) => {
  return ( 
    <>
      <div className={styles.DayRow}>
        <span className={styles.DayRowText}>{strRep}</span>
      </div>
    </>
   );
}
 
export default DayRow;
