import React from 'react';
import styles from './StartPage.module.css';

import Title from '../Title/Title';
import GetStarted from './SubComponents/GetStarted/GetStarted';

const StartPage = () => {
  return ( 
    <div className={styles.StartPage}>
      <div className={styles.StartPageGrid}>
        <Title/>
        <GetStarted/>
      </div>
    </div>
   );
}
 
export default StartPage;