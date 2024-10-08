import React from "react";
import { useState, useEffect, useContext } from "react";
import { DisplayMonthContext } from "../../../../src/App";

import styles from "./MonthTitle.module.css";

import { monthName } from "../../../../utils/dateUtils";

const MonthTitle = () => {
  const [currentMonth, setCurrentMonth] = useState("February 2024");

  const { displayMonth: currentDate } = useContext(DisplayMonthContext);

  useEffect(() => {
    const month = monthName[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    setCurrentMonth(`${month} ${year}`);
  });

  return (
    <div>
      <div className={`${styles.MonthTitle}`}>
        {currentMonth}
        {/* <img
          className={`${styles.ArrowButton}`}
          src="front_end\src\assets\General\triangle_down.svg"
        ></img> */}
      </div>
    </div>
  );
};

export default MonthTitle;
