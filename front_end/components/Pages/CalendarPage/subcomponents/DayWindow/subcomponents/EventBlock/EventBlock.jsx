import React from 'react';

import styles from './EventBlock.module.css';

const EventBlock = () => {
  return ( 
    <div className={styles.EventBlock}>
      <p className={styles.EventName}>Event</p>
      <p className={styles.EventTime}>1am - 2pm</p>
    </div>

   );
}
 
export default EventBlock;