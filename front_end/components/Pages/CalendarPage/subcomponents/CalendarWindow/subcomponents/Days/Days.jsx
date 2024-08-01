import React, { useEffect, useState, useContext } from 'react';

import styles from './Days.module.css';
import DayBox from './subcomponents/DayBox/DayBox';

import { DisplayMonthContext } from '../../../../../../../src/App';
import { getNextMonth, getPastMonth, getDaysOfMonth, getWeekday, areDatesEqual } from '../../../../../../../utils/dateUtils';

const Days = () => {
  const [dayData, setDayData] = useState([]);

  const maxDays = 42; // The number of boxes listed on the calendar.

  const { displayMonth: currentDate } = useContext(DisplayMonthContext);
  
  // function getDaysOfMonth(year, month) {
  //   return new Date(year, month + 1, 0).getDate();
  // }

  // function getWeekday(year, month, day) {
  //   return new Date(year, month, day).getDay();
  // }


  useEffect( () => {
    const today = new Date();

    const curYear = currentDate.getFullYear();
    const curMonth = currentDate.getMonth();

    const firstDayOfMonth = getWeekday( new Date( currentDate.getFullYear(), currentDate.getMonth(), 1 ));
    const currentMonthDays = getDaysOfMonth(currentDate);

    let remainingDays = maxDays - currentMonthDays;

    let newDayData = []

    // Get visible days of last month.
    // TODO: Refactor into using date object.
    const prevDate = getPastMonth(currentDate);
    const prevMonth = prevDate.getMonth();
    const prevYear = prevDate.getFullYear();

    const prevMonthDays = getDaysOfMonth(prevDate);

    for (let i = prevMonthDays - firstDayOfMonth + 1; i <= prevMonthDays; i++) {
      const date_id = `${prevYear}-${prevMonth + 1}-${i}`;
      newDayData.push({date_id, dayNumber: i, colorDisplay: "faded", isCurrentDay: areDatesEqual(today, new Date(prevYear, prevMonth, i)) });
      remainingDays -= 1;
    }
    
    // Create visible days of current month.
    for (let i = 1; i <= currentMonthDays; i++) {
      const date_id = `${curYear}-${curMonth + 1}-${i}`;
      newDayData.push({date_id, dayNumber: i, colorDisplay: "full", isCurrentDay: areDatesEqual(today, new Date(curYear, curMonth, i)) });
    }

    const nextDate = getNextMonth(currentDate);
    const nextMonth = nextDate.getMonth();
    const nextYear = nextDate.getFullYear();

    // Get visible days of next month.
    for (let i = 1; i <= remainingDays; i++) {
      const date_id = `${nextYear}-${nextMonth + 1}-${i}`;
      newDayData.push({date_id, dayNumber: i, colorDisplay: "faded", isCurrentDay: areDatesEqual(today, new Date(nextYear, nextMonth, i)) });
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
        isCurrentDay={dayObject.isCurrentDay}
        />
      })}
    </>
   );
}
 
export default Days;