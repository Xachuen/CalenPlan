import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import styles from './FriendsButton.module.css';

const FriendsButton = ( { className } ) => {
  // These handle showing the drop down.
  const [show, setShow] = useState(false);
  const toggleDropdown = () => setShow(!show);

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
          <Dropdown.Divider />
          <form>
            <input className={styles.FriendEmailInput}
            placeholder="Friend's Email"></input>
            <button className={styles.AddFriendButton}>Add</button>
          </form>
        </Dropdown.Menu>
      </Dropdown> 
    </div>
    </>
   );
}
 
export default FriendsButton;
