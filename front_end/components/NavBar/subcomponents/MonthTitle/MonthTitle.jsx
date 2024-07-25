import React from 'react';

import styles from './MonthTitle.module.css';

const MonthTitle = () => {
  return (
    <div>
      <div className={`${styles.MonthTitle}`}>
        February 2024
        <img className={`${styles.ArrowButton}`} src='front_end\src\assets\General\triangle_down.svg'></img>  
      </div>
    </div>
    
   );
}
 
export default MonthTitle;
