import React from 'react';
import styles from './StartPage.module.css';

import Logo from '../Logo/Logo';
import GetStarted from './SubComponents/GetStarted/GetStarted';

const StartPage = () => {
  return ( 
    <div className={styles.StartPage}>
      <div className={styles.StartPageGrid}>
        <Logo/>
        <GetStarted/>
      </div>
    </div>
   );
}
 
export default StartPage;