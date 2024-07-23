import React from 'react';
import styles from './NavBar.module.css';
import Logo from '../Logo/Logo';
import ProfilePictureIcon from '../ProfilePictureIcon/ProfilePictureIcon';
import FriendsButton from './subcomponents/FriendsButton/FriendsButton';
import NotificationButton from './subcomponents/NotificationButton/NotificationButton';


const NavBar = () => {
  return ( 
    <nav className={styles.NavBar}>
      <div className={`${styles.NavLeft}`}>
        <Logo className={`${styles.LogoNavBar} ${styles.NavItem}`}/>
      </div>
  
      <div className={`${styles.NavCenter}`}>

      </div>

      <div className={`${styles.NavRight}`}>
        <FriendsButton className={`${styles.NavItem}`}/>
        <NotificationButton className={`${styles.NavItem}`}/>
        <ProfilePictureIcon className={`${styles.ProfileNavBar} ${styles.NavItem}`}/>
      </div>

    </nav>
   );
}
 
export default NavBar;