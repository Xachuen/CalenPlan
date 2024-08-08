import React from 'react';

import styles from './EventBlock.module.css';

const EventBlock = ( { eventName, eventTime, minuteLength, minuteStart } ) => {
  return ( 
    <div className={styles.EventBlock} style={{height: `${minuteLength * 0.17}rem`, top: `${minuteStart * 0.17}rem`}}>
      <p className={styles.EventName}>{eventName}</p>
      <p className={styles.EventTime}>{eventTime}</p>
    </div>

   );
}
 
export default EventBlock;