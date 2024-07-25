import React from 'react';
import { useState, useEffect } from 'react';


import styles from './MonthTitle.module.css';

const MonthTitle = () => {
  const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const [currentMonth, setCurrentMonth] = useState("February 2024"); 

  useEffect(()=>{
    const currentDate = new Date();
    const month = monthName[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    setCurrentMonth(`${month} ${year}`);
  });

  return (
    <div>
      <div className={`${styles.MonthTitle}`}>
        {currentMonth}
        <img className={`${styles.ArrowButton}`} src='front_end\src\assets\General\triangle_down.svg'></img>  
      </div>
    </div>
    
   );
}
 
export default MonthTitle;
