import React from 'react';
import { useContext, useState } from 'react';

import { EventsDataContext} from '../../DayWindow';
import { DisplayMonthContext } from '../../../../../../../src/App';

import styles from './DayRow.module.css';
import EventBlock from '../EventBlock/EventBlock';


const DayRow = ( { hour, strRep, hourLabel, timeDivide }) => {
  // Contexts
  const { eventsData, setEventsData } = useContext(EventsDataContext);
  const { displayMonth, setDisplayMonth } = useContext(DisplayMonthContext);

  // Date
  const date_id = `${displayMonth.getFullYear()}-${displayMonth.getMonth()}-${displayMonth.getDate()}`;

  return ( 
    <>
      
      <div className={styles.DayRow}>
        {/* {console.log(strRep, hourLabel, timeDivide)} */}
        {
          eventsData[date_id] && eventsData[date_id][hour-1] && eventsData[date_id][hour-1].map( (dateEventObj) => {
           return <EventBlock key={crypto.randomUUID()}
           minuteLength={dateEventObj.minuteLength}
           minuteStart={dateEventObj.minuteStart}
           eventName={dateEventObj.eventName}
           eventTime={dateEventObj.eventTime}
           eventDescription={dateEventObj.eventDescription}
           />
          })
        }
        <span className={styles.DayRowText}>{strRep}</span>
      </div>
    </>
   );
}
 
export default DayRow;
