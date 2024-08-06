import React, { createContext } from 'react';
import { Routes, Route } from 'react-router-dom';


import styles from './CalendarPage.module.css';
import CalendarWindow from './subcomponents/CalendarWindow/CalendarWindow';
import DayWindow from './subcomponents/DayWindow/DayWindow';

const CalendarPage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<CalendarWindow/>} />
        <Route path="/day-view" element={<DayWindow/>} />
      </Routes>
    </>
   );
}
 
export default CalendarPage;
