import React, {useContext, useState} from 'react';

import styles from './FriendRequest.module.css';
import { postToServer } from '../../../../utils/dataBaseUtils';
import { UserDataContext } from '../../../../src/App';

const FriendRequest = ( { requesterEmail } ) => {
  const { user } = useContext(UserDataContext);

  const [ acceptReject, setAcceptReject ] = useState('');
  const submitFriendRequest = (event) => {
    event.preventDefault();

    if (acceptReject === 'accept') {
      postToServer( {
        bodyData: {accepterEmail: user.primaryEmailAddress.emailAddress, requesterEmail: requesterEmail },
        linkExtender: '/api/user-data/:userId/friends/requests/accept'
      } )
    }
    else if (acceptReject === 'reject') {
      postToServer( {
        bodyData: {rejecterId: user.id, requesterEmail: requesterEmail },
        linkExtender: '/api/user-data/:userId/friends/requests/reject'
      } )
    }

  }

  return ( 
    <form className={styles.FriendRequest} onSubmit={submitFriendRequest}>
      {/* TODO: replace with friendEmail variable */}
      <p className={styles.FriendEmail}>{requesterEmail}</p>
      <div>
        <button 
        className={styles.AddButton}
        onClick={()=> {setAcceptReject('accept')}}
        type='submit'>
          ✓
        </button>
        <button 
        className={styles.RejectButton}
        onClick={()=> {setAcceptReject('reject')}}
        type='submit'>
          X
        </button>
      </div>
    </form>
   );
}
 
export default FriendRequest;
