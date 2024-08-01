import React, { useEffect } from 'react';

import styles from './DayWindow.module.css';
import DayRow from './subcomponents/DayRow/DayRow';

const DayWindow = () => {

  useEffect( () => {
    for (let i = 1; i <= 24; i++) {
      
    }

  });


  return ( 
    <>
    <div className={styles.CenterContainer}>
      <div className={styles.DayContainer}>
        <div className={styles.DayHeader}>
              <div className={styles.CurrentDayText}>Thursday, 15</div>
              <div className={styles.BackArrow}>
                <img className={styles.ArrowImage} src='front_end\src\assets\General\arrow_top_right.svg'/>
              </div> 
        </div>
        <div className={styles.DayRoot}>
          <div className={styles.DayWindow}>
            <DayRow/>
            <DayRow/>
            <DayRow/>
            <DayRow/>
            <DayRow/>
            <DayRow/>
            <DayRow/>
            <DayRow/>
            <DayRow/>
            <DayRow/>
            <DayRow/>
            <DayRow/>
            <DayRow/>
            <DayRow/>
            <DayRow/>
            <DayRow/>
            <DayRow/>
            <DayRow/>
            <DayRow/>
            <DayRow/>
            <DayRow/>
            <DayRow/>
            <DayRow/>
            <DayRow/>
          </div>
        </div>
      </div>
    </div>
    </>
   );
}
 
export default DayWindow;
