import React from 'react';
import styles from './NavBar.module.css';
import Logo from '../Logo/Logo';
import ProfilePictureIcon from '../ProfilePictureIcon/ProfilePictureIcon';
import FriendsButton from './subcomponents/FriendsButton/FriendsButton';
import NotificationButton from './subcomponents/NotificationButton/NotificationButton';
import CalendarButton from './subcomponents/CalendarButton/CalendarButton';


const NavBar = () => {
  return ( 
    <nav className={styles.NavBar}>
      <div className={`${styles.NavLeft}`}>
        <Logo className={`${styles.LogoNavBar} ${styles.NavItem}`}/>
      </div>
  
      <div className={`${styles.NavCenter}`}>

      </div>

      <div className={`${styles.NavRight}`}>
        <FriendsButton className={`${styles.NavItem} ${styles.NavItemButton}`}/>
        <NotificationButton className={`${styles.NavItem} ${styles.NavItemButton}`}/>
        <CalendarButton className={`${styles.NavItem} ${styles.NavItemButton}`}/>
        <ProfilePictureIcon className={`${styles.ProfileNavBar} ${styles.NavItem} ${styles.NavItemButton}`}/>
      </div>

    </nav>
   );
}
 
export default NavBar;