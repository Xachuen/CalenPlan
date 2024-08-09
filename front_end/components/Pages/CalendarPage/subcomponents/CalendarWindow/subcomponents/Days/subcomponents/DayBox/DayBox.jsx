import React, { useContext } from 'react';

import styles from './DayBox.module.css';
import { useNavigate } from 'react-router-dom';

import { DisplayMonthContext, EventsDataContext } from '../../../../../../../../../src/App';

const DayBox = ( { date_id, dateObj, dayNumber, colorDisplay, isCurrentDay }) => {
  const navigate = useNavigate();
  const { displayMonth, setDisplayMonth } = useContext(DisplayMonthContext);
  const { eventsData } = useContext(EventsDataContext);
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
      { eventsData[date_id] && <img className={styles.CircleIcon} src='front_end\src\assets\General\circle.svg'/>}
    </div>
   );
}
 
export default DayBox;
