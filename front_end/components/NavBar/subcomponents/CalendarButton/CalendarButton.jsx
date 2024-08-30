import React, { useState } from "react";
import { Dropdown, Tab, Tabs } from "react-bootstrap";
import styles from "./CalendarButton.module.css";

const CalendarButton = ({ className }) => {
  const [ show, setShow ] = useState(false);
  const toggleDropdown = () => setShow(!show);
  
  const [ friendEmailInput, setFriendEmailInput ] = useState("");
  
  return (
    <div className={styles.DropDownContainer}>
      <img
        className={`${className} ${styles.CalendarButton}`}
        src="front_end\src\assets\General\calendar.svg"
        onClick={toggleDropdown}
      />

      <Dropdown show={show} onToggle={toggleDropdown} align="end">
        <Dropdown.Menu
          className={`${styles.DropDownPosition} ${styles.CustomMenu}`}
        >
          <Tabs defaultActiveKey="members" className={styles.BoldTabTitle}>
            <Tab eventKey="members" title="Members">
              <div className={styles.FriendsList}>
                {/* {localFriendsList.map((friendEmail) => {
                  return (
                    <FriendLabel key={friendEmail} friendEmail={friendEmail} />
                  );
                })} */}
              </div>
            </Tab>
            <Tab eventKey="calendars" title="Calendars">
              <div className={styles.RequestList}>
            {/*     {localFriendRequests.map((requesterEmail) => {
                  return (
                    <FriendRequest
                      key={requesterEmail}
                      requesterEmail={requesterEmail}
                    />
                  );
                })} */}
              </div>
            </Tab>
          </Tabs>
          <Dropdown.Divider />
          <form onSubmit={(e) => sendFriendRequest(e)}>
            <input
              className={styles.FriendEmailInput}
              placeholder="Friend's Email"
              value={friendEmailInput}
              onChange={(e) => {
                setFriendEmailInput(e.target.value);
              }}
            />
            <button className={styles.AddFriendButton}>Add</button>
          </form>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default CalendarButton;
