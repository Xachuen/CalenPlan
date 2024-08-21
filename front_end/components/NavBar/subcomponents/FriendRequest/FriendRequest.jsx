import React, {useContext, useState} from 'react';

import styles from './FriendRequest.module.css';
import { postToServer } from '../../../../utils/dataBaseUtils';
import { FriendsContext, UserDataContext } from '../../../../src/App';
import { shortenEmail } from '../../../../utils/friendUtils';

const FriendRequest = ( { requesterEmail } ) => {
  const { user } = useContext(UserDataContext);
  const { localFriendRequests, localFriendsList, setLocalFriendRequests, setLocalFriendsList } = useContext(FriendsContext);
  const [ acceptReject, setAcceptReject ] = useState('');
  const submitFriendRequest = (event) => {
    event.preventDefault();

    if (acceptReject === 'accept') {
      postToServer( {
        bodyData: {accepterEmail: user.primaryEmailAddress.emailAddress, requesterEmail: requesterEmail },
        linkExtender: '/api/user-data/:userId/friends/requests/accept'
      } )
      setLocalFriendRequests(localFriendRequests.filter( (friendRequest) => friendRequest !== requesterEmail ))
      setLocalFriendsList([...localFriendsList, requesterEmail]); 
    }
    else if (acceptReject === 'reject') {
      postToServer( {
        bodyData: {rejecterEmail: user.primaryEmailAddress.emailAddress, requesterEmail: requesterEmail },
        linkExtender: '/api/user-data/:userId/friends/requests/reject'
      } )
      setLocalFriendRequests(localFriendRequests.filter( (friendRequest) => friendRequest !== requesterEmail ))
    }

  }

  return ( 
    <form className={styles.FriendRequest} onSubmit={submitFriendRequest}>
      <p className={styles.FriendEmail}>{shortenEmail(requesterEmail)}</p>
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
