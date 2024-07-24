import React from 'react';
import styles from './StartPage.module.css';

import Logo from '../../Logo/Logo';
import GetStarted from './subcomponents/GetStarted/GetStarted';

const StartPage = () => {
  return ( 
    <div className={styles.StartPage}>
      <Logo className={styles.LogoStartPage}/>
      <p className={styles.StartPageParagraph}>Welcome the CalenPlan, to calendar app to plan with you friends!
        Get started by signing in and invite friends to start planning!
      </p>
      <GetStarted/>
    </div>
   );
}
 
export default StartPage;