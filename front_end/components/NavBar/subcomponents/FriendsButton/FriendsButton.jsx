import React, { useState } from 'react';
import { Dropdown, Tab, Tabs } from 'react-bootstrap';
import styles from './FriendsButton.module.css';

const FriendsButton = ( { className } ) => {
  // These handle showing the drop down.
  const [show, setShow] = useState(false);
  const toggleDropdown = () => setShow(!show);

  //State for Friend Input
  const [friendEmailInput, setFriendEmailInput] = useState('');


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
            <Tab eventKey="requests" title="Requests">hi</Tab> 
          </Tabs>
          <Dropdown.Divider />
          <form>
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
