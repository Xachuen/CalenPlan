import React, { useContext, useState } from 'react';
import { Dropdown, Tab, Tabs } from 'react-bootstrap';
import styles from './FriendsButton.module.css';
import { postToServer} from '../../../../utils/dataBaseUtils';
import { UserDataContext } from '../../../../src/App';
import FriendRequest from '../FriendRequest/FriendRequest';

const FriendsButton = ( { className } ) => {
  const { user } = useContext(UserDataContext);

  // These handle showing the drop down.
  const [show, setShow] = useState(false);
  const toggleDropdown = () => setShow(!show);

  //State for Friend Input
  const [friendEmailInput, setFriendEmailInput] = useState('');

  //Function for submitting friend request
  const sendFriendRequest = (event) => {
    event.preventDefault();
    postToServer({
      bodyData: { requestedFriend: friendEmailInput },
      linkExtender: `/api/user-data/${user.id}/friends/requests`
    });

  }

  return (
    <>
    <div className={styles.DropDownContainer}>
      <img 
      className={`${className} ${styles.FriendsButton}`} 
      src='front_end\src\assets\General\group.svg'
      onClick={toggleDropdown} 
      />
      <Dropdown show={show} onToggle={toggleDropdown} align="end">
        <Dropdown.Menu className={`${styles.DropDownPosition} ${styles.CustomMenu}`}>
          <Tabs
          defaultActiveKey="friends"
          className={styles.BoldTabTitle}
          >
            <Tab eventKey="friends" title="Friends">
              <div className={styles.FriendsList}>
                <Dropdown.Item href="#/action-1">Friend</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Friend</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Friend</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Friend</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Friend</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Friend</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Friend</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Friend</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Friend</Dropdown.Item>
              </div>
            </Tab> 
            <Tab eventKey="requests" title="Requests">
              <div className={styles.RequestList}>
                <FriendRequest/>
              </div>   
            </Tab> 
          </Tabs>
          <Dropdown.Divider />
          <form onSubmit={(e) => sendFriendRequest(e)}>
            <input className={styles.FriendEmailInput}
            placeholder="Friend's Email"
            value={friendEmailInput}
            onChange={(e) => {setFriendEmailInput(e.target.value)}}
            />
            <button className={styles.AddFriendButton}>Add</button>
          </form>
        </Dropdown.Menu>
      </Dropdown> 
    </div>
    </>
   );
}
 
export default FriendsButton;
