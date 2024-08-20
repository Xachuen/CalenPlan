import React from 'react';

import styles from './FriendRequest.module.css';

const FriendRequest = () => {
  return ( 
    <form className={styles.FriendRequest}>
      <p className={styles.FriendEmail}>Friend</p>
      <div>
        <button className={styles.AddButton}>✓</button>
        <button className={styles.RejectButton}>X</button>
      </div>
    </form>
   );
}
 
export default FriendRequest;
