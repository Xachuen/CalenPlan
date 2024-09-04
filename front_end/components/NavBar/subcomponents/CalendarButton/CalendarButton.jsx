import React, { useState, useContext } from "react";
import { Dropdown, Tab, Tabs } from "react-bootstrap";
import styles from "./CalendarButton.module.css";
import MemberLabel from "../MemberLabel/MemberLabel";
import CalendarLabel from "../CalendarLabel/CalendarLabel";
import { UserDataContext } from "../../../../src/App";
import { FriendsContext } from "../../../../src/App";
import { postToServer } from "../../../../utils/dataBaseUtils";

const CalendarButton = ({ className }) => {
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const toggleDropdown = () => setShow(!show);

  const {
    userData: { user, members, accessedCalendars },
  } = useContext(UserDataContext);
  const { localFriendsList } = useContext(FriendsContext);
  const [friendEmailInput, setFriendEmailInput] = useState("");

  const addToMembers = (event) => {
    event.preventDefault();
    if (!localFriendsList.includes(friendEmailInput)) {
      setShowError(true);
      return;
    }
    setShowError(false);
    postToServer({
      bodyData: {
        friendEmail: friendEmailInput,
        userEmail: user.primaryEmailAddress.emailAddress,
      },
      linkExtender: `/api/user-data/${user.id}/members/add`,
    });
  };

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
              <div className={styles.MembersList}>
                {members.map((memberEmail) => {
                  return (
                    <MemberLabel key={memberEmail} memberEmail={memberEmail} />
                  );
                })}
              </div>
            </Tab>
            <Tab eventKey="calendars" title="Calendars">
              <div className={styles.CalendarsList}>
                {accessedCalendars.map((calendarEmail) => {
                  return (
                    <CalendarLabel
                      key={calendarEmail}
                      calendarEmail={calendarEmail}
                    />
                  );
                })}
              </div>
            </Tab>
          </Tabs>
          <Dropdown.Divider />
          <form onSubmit={(e) => addToMembers(e)}>
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
          {showError && (
            <p className={styles.EmailError}>
              Enter a valid email apart of your friend's list!
            </p>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default CalendarButton;
