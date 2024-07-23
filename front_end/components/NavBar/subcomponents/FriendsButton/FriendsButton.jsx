import React from 'react';

import styles from './FriendsButton.module.css';

const FriendsButton = ( { className } ) => {
  return ( 
    <img className={`${className} ${styles.FriendsButton}`} src='front_end\src\assets\General\group.svg'/>
   );
}
 
export default FriendsButton;
