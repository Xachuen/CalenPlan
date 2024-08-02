import React, { useContext } from 'react';

import styles from './DayBox.module.css';
import { useNavigate } from 'react-router-dom';

import { DisplayMonthContext } from '../../../../../../../../../src/App';

const DayBox = ( { dateObj, dayNumber, colorDisplay, isCurrentDay }) => {
  const navigate = useNavigate();
  const { displayMonth, setDisplayMonth } = useContext(DisplayMonthContext);

  return ( 
    <div 
    className={`${isCurrentDay ? styles.CurrentDay : ''} ${styles.DayBox} ${styles[colorDisplay]}`}
    onClick={() => {
      console.log(typeof dateObj)
      setDisplayMonth(dateObj);
      navigate("/day-view");
    }}
    >
      {dayNumber}
    </div>
   );
}
 
export default DayBox;
