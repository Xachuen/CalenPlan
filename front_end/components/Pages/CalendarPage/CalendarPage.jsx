import React, { createContext } from 'react';

import styles from './CalendarPage.module.css';
import CalendarWindow from './subcomponents/CalendarWindow/CalendarWindow';
import DayWindow from './subcomponents/DayWindow/DayWindow';


const CalendarPage = () => {

  return (
    // <DayWindow/> 
    <CalendarWindow/>
   );
}
 
export default CalendarPage;
