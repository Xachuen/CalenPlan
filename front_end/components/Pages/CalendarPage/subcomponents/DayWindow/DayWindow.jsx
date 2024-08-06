import React, { createContext, useEffect, useState } from 'react';

import styles from './DayWindow.module.css';
import DayRow from './subcomponents/DayRow/DayRow';
import SeperatorBar from './subcomponents/SeperatorBar/SeperatorBar';
import DayHeader from './subcomponents/DayHeader/DayHeader';

export const EventsDataContext = createContext();

const DayWindow = () => {
  const [ hourList, setHourList ] = useState([]);
  const [ eventsData, setEventsData ] = useState({});

  useEffect( () => {
    const tempHourList = []
    for (let i = 1; i <= 23; i++) {
      const hourLabel = i <= 12 ? i : i - 12;
      const timeDivide = i < 12 ? "AM" : "PM"
      const strRep = hourLabel.toString() + timeDivide
      tempHourList.push( { hourLabel, timeDivide, strRep } )
    }
    setHourList(tempHourList);
    

  }, []);
  

  return ( 
    <EventsDataContext.Provider value={ { eventsData, setEventsData } }>
      <div className={styles.CenterContainer}>
        <div className={styles.DayContainer}>
          <DayHeader/>
          <div className={styles.DayRoot}>
            <div className={styles.DayWindow}>
              {
                hourList.map( (hourObject) => {
                  return (
                  <React.Fragment key={hourObject.strRep}>
                    <DayRow 
                    strRep={hourObject.strRep}
                    hourLabel={hourObject.hourLabel}
                    timeDivide={hourObject.timeDivide}
                    />
                    <SeperatorBar/>
                  </React.Fragment>
                  )
              })}
            </div>
          </div>
        </div>
      </div>
    </EventsDataContext.Provider>
   );
}
 
export default DayWindow;
