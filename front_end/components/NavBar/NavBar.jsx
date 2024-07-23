import React from 'react';
import styles from './NavBar.module.css';
import Logo from '../Logo/Logo';
import ProfilePictureIcon from '../ProfilePictureIcon/ProfilePictureIcon';


const NavBar = () => {
  return ( 
    <nav className={styles.NavBar}>
      <Logo className={`${styles.LogoNavBar} ${styles.NavItem}`}/>
      <ProfilePictureIcon className={`${styles.ProfileNavBar} ${styles.NavItem}`}/>
    </nav>
   );
}
 
export default NavBar;