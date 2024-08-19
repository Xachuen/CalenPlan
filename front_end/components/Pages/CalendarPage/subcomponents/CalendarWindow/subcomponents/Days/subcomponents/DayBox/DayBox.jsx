import React, { useContext } from 'react';

import styles from './DayBox.module.css';
import { useNavigate } from 'react-router-dom';

import { DisplayMonthContext, EventsDataContext, UserDataContext } from '../../../../../../../../../src/App';

const DayBox = ( { date_id, dateObj, dayNumber, colorDisplay, isCurrentDay }) => {
  const navigate = useNavigate();
  const { displayMonth, setDisplayMonth } = useContext(DisplayMonthContext);
  const { eventsData, setEventsData } = useContext(EventsDataContext);

  const { user } = useContext(UserDataContext);

  return ( 
    <div 
    className={`${isCurrentDay ? styles.CurrentDay : ''} ${styles.DayBox} ${styles[colorDisplay]}`}
    onClick={async () => {
      console.log(typeof dateObj)

      if ((eventsData[date_id]) && !(eventsData[date_id]['seen'].includes(user.id))) {
        const updatedSeen = [...eventsData[date_id]['seen'], user.id];

        const updatedEventsData = {
          ...eventsData,
          [date_id]: {
              ...(eventsData[date_id] || {}),
              seen: updatedSeen,
          }
        };

        setEventsData(updatedEventsData);

        try {
          const response = await fetch(`http://localhost:3000/api/user-data`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user.id,
                calendar_data: updatedEventsData
            }),


          });
          if (!response.ok) {
              throw new Error('Failed to update calendar data');
          }

          const result = await response.json();
          console.log('Update successful:', result);
          } catch (error) {
              console.error('Error updating calendar data:', error);
          }
      };


    

      setDisplayMonth(dateObj);
      navigate("/day-view");
    }}
    >
      {dayNumber}
      { eventsData[date_id] && <img className={styles.CircleIcon} src='front_end\src\assets\General\circle.svg'/>}
      { eventsData[date_id] && !(eventsData[date_id]['seen'].includes(user.id)) && <div className={styles.notification}>!</div>}
    </div>
   );
}
 
export default DayBox;
