import React, { useEffect, useState, useContext } from "react";

import styles from "./Days.module.css";
import DayBox from "./subcomponents/DayBox/DayBox";

import { DisplayMonthContext } from "../../../../../../../src/App";
import {
  getNextMonth,
  getPastMonth,
  getDaysOfMonth,
  getWeekday,
  areDatesEqual,
} from "../../../../../../../utils/dateUtils";

const Days = () => {
  const [dayData, setDayData] = useState([]);

  const maxDays = 42; // The number of boxes listed on the calendar.

  const { displayMonth: currentDate } = useContext(DisplayMonthContext);

  const generateDayData = (start, end, year, month, colorDisplay, today) => {
    const dayDataArray = [];
    for (let i = start; i <= end; i++) {
      const date_id = `${year}-${month + 1}-${i}`;
      const date_obj = new Date(year, month, i);
      dayDataArray.push({
        date_obj,
        date_id,
        dayNumber: i,
        colorDisplay,
        isCurrentDay: areDatesEqual(today, date_obj),
      });
    }
    return dayDataArray;
  };

  useEffect(() => {
    const today = new Date();

    const curYear = currentDate.getFullYear();
    const curMonth = currentDate.getMonth();

    const firstDayOfMonth = getWeekday(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
    );
    const currentMonthDays = getDaysOfMonth(currentDate);
    let newDayData = [];

    // Get visible days of last month.
    const prevDate = getPastMonth(currentDate);
    const prevMonth = prevDate.getMonth();
    const prevYear = prevDate.getFullYear();

    const prevMonthDays = getDaysOfMonth(prevDate);
    newDayData.push(
      ...generateDayData(
        prevMonthDays - firstDayOfMonth + 1,
        prevMonthDays,
        prevYear,
        prevMonth,
        "faded",
        today,
      ),
    );

    // Create visible days of current month.
    newDayData.push(
      ...generateDayData(1, currentMonthDays, curYear, curMonth, "full", today),
    );

    const remainingDays = maxDays - newDayData.length;

    // Get visible days of next month.
    const nextDate = getNextMonth(currentDate);
    const nextMonth = nextDate.getMonth();
    const nextYear = nextDate.getFullYear();

    newDayData.push(
      ...generateDayData(1, remainingDays, nextYear, nextMonth, "faded", today),
    );

    setDayData(newDayData);
  }, [currentDate]);

  return (
    <>
      {console.log(dayData)}
      {dayData.map((dayObject) => {
        return (
          <DayBox
            key={dayObject.date_id}
            date_id={dayObject.date_id}
            dateObj={dayObject.date_obj}
            dayNumber={dayObject.dayNumber}
            colorDisplay={dayObject.colorDisplay}
            isCurrentDay={dayObject.isCurrentDay}
          />
        );
      })}
    </>
  );
};

export default Days;
