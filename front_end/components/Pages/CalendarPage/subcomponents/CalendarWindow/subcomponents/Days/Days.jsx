import React, { useEffect, useState, useContext } from 'react';

import styles from './Days.module.css';
import DayBox from './subcomponents/DayBox/DayBox';

import { DisplayMonthContext } from '../../../../../../../src/App';

const Days = () => {
  const [dayData, setDayData] = useState([]);

  const maxDays = 42; // The number of boxes listed on the calendar.

  const { displayMonth: currentDate } = useContext(DisplayMonthContext);
  const curMonth = currentDate.getMonth();
  const curYear = currentDate.getFullYear();
  
  function getDaysOfMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getWeekday(year, month, day) {
    return new Date(year, month, day).getDay();
  }


  useEffect( () => {
    const firstDayOfMonth = getWeekday(curYear, curMonth, 1);
    const currentMonthDays = getDaysOfMonth(curYear, curMonth);
    let remainingDays = maxDays - currentMonthDays;


    let newDayData = []

    // Get visible days of last month.
    const prevMonth = curMonth === 0 ? 11 : curMonth - 1;
    const prevYear = curMonth === 0 ? curYear - 1 : curYear;
    const prevMonthDays = getDaysOfMonth(prevYear, prevMonth);

    console.log(firstDayOfMonth)
    console.log(prevMonthDays)
    for (let i = prevMonthDays - firstDayOfMonth + 1; i <= prevMonthDays; i++) {
      const date_id = `${prevYear}-${prevMonth + 1}-${i}`;
      newDayData.push({date_id, dayNumber: i, colorDisplay: "faded"});
      remainingDays -= 1;
    }
    
    // Create visible days of current month.
    for (let i = 1; i <= currentMonthDays; i++) {
      const date_id = `${curYear}-${curMonth + 1}-${i}`;
      newDayData.push({date_id, dayNumber: i, colorDisplay: "full"});
    }

    const nextMonth = curMonth === 11 ? 0 : curMonth + 1;
    const nextYear = curMonth === 11 ? curYear + 1 : curYear;
    // Get visible days of next month.
    for (let i = 1; i <= remainingDays; i++) {
      const date_id = `${nextYear}-${nextMonth + 1}-${i}`;
      newDayData.push({date_id, dayNumber: i, colorDisplay: "faded"});
    }

    setDayData(newDayData);
  }, [ currentDate ]);

  return ( 
    <>
      {dayData.map( (dayObject) => {
        return <DayBox
        key = {dayObject.date_id}
        dayNumber={dayObject.dayNumber}
        colorDisplay={dayObject.colorDisplay}
        />
      })}
      {console.log(dayData)}
    </>
   );
}
 
export default Days;