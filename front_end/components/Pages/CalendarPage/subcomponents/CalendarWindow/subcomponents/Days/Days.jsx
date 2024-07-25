import React, { useEffect } from 'react';

import styles from './Days.module.css';
import DayBox from './subcomponents/DayBox/DayBox';



const Days = () => {

  useEffect( () => {
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    
    const daysOfMonth = new Date(year, month + 1, 0).getDate();
    console.log(daysOfMonth);
  });

  return ( 
    <>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
      <DayBox/>
    </>
   );
}
 
export default Days;