import React, { useContext } from 'react';

import styles from './DayHeader.module.css';
import { DisplayMonthContext } from '../../../../../../../src/App';

import { weekdayName } from '../../../../../../../utils/dateUtils';

const DayHeader = () => {
  const { displayMonth, setDisplayMonth } = useContext(DisplayMonthContext);

  return ( 
    <div className={styles.DayHeader}>
      <div className={styles.CurrentDayText}>{`${weekdayName[displayMonth.getDay()]}, ${displayMonth.getDate()}`}</div>
      <div className={styles.BackArrow}>
        <img className={styles.ArrowImage} src='front_end\src\assets\General\arrow_top_right.svg'/>
      </div> 
  </div>
   );
}
 
export default DayHeader;
