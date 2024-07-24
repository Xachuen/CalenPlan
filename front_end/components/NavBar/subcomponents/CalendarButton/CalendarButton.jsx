import React from 'react';

import styles from './CalendarButton.module.css';

const CalendarButton = ( {className} ) => {
  return ( 
    <img className={`${className} ${styles.CalendarButton}`} src='front_end\src\assets\General\calendar.svg'/>
   );
}
 
export default CalendarButton;