import React from 'react';
import styles from './Logo.module.css';

const Logo = ({ className }) => {
  return ( 
    <img className={className} src='front_end\src\assets\General\calenplanlogo.svg'/>
   );
}
 
export default Logo;