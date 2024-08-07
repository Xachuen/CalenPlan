import React from 'react';
import { useContext } from 'react';

import { EventsDataContext} from '../../DayWindow';
import { DisplayMonthContext } from '../../../../../../../src/App';

import styles from './DayRow.module.css';
import EventBlock from '../EventBlock/EventBlock';

const DayRow = ( { hour, strRep, hourLabel, timeDivide }) => {
  const { eventsData, setEventsData } = useContext(EventsDataContext);
  const { displayMonth, setDisplayMonth } = useContext(DisplayMonthContext);

  const date_id = `${displayMonth.getFullYear()}-${displayMonth.getMonth()}-${displayMonth.getDate()}`;

  
  return ( 
    <>
      <div className={styles.DayRow}>
        {/* {console.log(strRep, hourLabel, timeDivide)} */}
        {
          eventsData[date_id] && eventsData[date_id][hour-1] && eventsData[date_id][hour-1].map( (dateEvent) => {
           return <EventBlock/>
          })
        }
        <span className={styles.DayRowText}>{strRep}</span>
      </div>
    </>
   );
}
 
export default DayRow;
