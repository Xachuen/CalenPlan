import React from 'react';
import styles from './NavBar.module.css';
import Logo from '../Logo/Logo';


const NavBar = () => {
  return ( 
    <nav className={styles.NavBar}>
      <Logo/>
    </nav>
   );
}
 
export default NavBar;