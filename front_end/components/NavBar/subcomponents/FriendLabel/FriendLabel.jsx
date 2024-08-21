import React, { useContext } from 'react';

import styles from './FriendLabel.module.css';
import { shortenEmail } from '../../../../utils/friendUtils';
import { postToServer } from '../../../../utils/dataBaseUtils';
import { UserDataContext } from '../../../../src/App';

const FriendLabel = ( { friendEmail } ) => {
  const { user } = useContext(UserDataContext);

  const deleteFriend = () => {
    postToServer( {
      bodyData: { deletedFriendEmail: friendEmail, userEmail: user.primaryEmailAddress.emailAddress },
      linkExtender: '/'
    } )
  }

  return (
    <form className={styles.FriendLabel} onSubmit={deleteFriend}>
      <p className={styles.FriendEmail}>{shortenEmail(friendEmail)}</p>
      <div>
        <button 
        className={styles.changeName}
        type='submit'>
          X
        </button>
      </div>
    </form>
     );
}
 
export default FriendLabel;