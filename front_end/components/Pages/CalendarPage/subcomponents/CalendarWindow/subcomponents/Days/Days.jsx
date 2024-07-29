import React, { useEffect, useState } from 'react';

import styles from './Days.module.css';
import DayBox from './subcomponents/DayBox/DayBox';



const Days = () => {
  const [dayData, setDayData] = useState([]);

  const maxDays = 42; // The number of boxes listed on the calendar.
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const currentDate = new Date();
  const curMonth = currentDate.getMonth();
  const curYear = currentDate.getFullYear();
  
  function getDaysOfMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getWeekday(year, month, day) {
    return new Date(year, month, day).getDay();
  }


  useEffect( () => {
    // A list of all the date objects, a hash map? I need to figure out how I'm going to do that. Next learn MONGODB.
    const prevMonthDays = getDaysOfMonth(curYear, curMonth - 1);
    const currentMonthDays = getDaysOfMonth(curYear, curMonth);
    const nextMonthDays = getDaysOfMonth(curYear, curMonth + 1);

    const firstDayOfMonth = getWeekday(curYear, curMonth, 1);

    let remainingDays = maxDays - currentMonthDays;

    // Get visible days of last month.
    console.log("rendered");

    let newDayData = []
    for (let i = prevMonthDays - firstDayOfMonth; i < prevMonthDays; i++) {
      newDayData.push({dayNumber: i});
      remainingDays -= 1;
    }
    
    // Create visible days of current month.
    for (let i = 1; i <= currentMonthDays; i++) {
      newDayData.push({dayNumber: i});
    }

    // Get visible days of next month.
    for (let i = 1; i <= remainingDays; i++) {
      newDayData.push({dayNumber: i});
    }

    setDayData(newDayData);
    console.log(dayData);
  }, []);

  return ( 
    <>
      {dayData.map( (dayObject) => {
        return <DayBox dayNumber={dayObject.dayNumber}/>
      })}
    </>
   );
}
 
export default Days;