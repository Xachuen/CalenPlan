import React, { useContext, useState } from "react";
import { Dropdown, Tab, Tabs } from "react-bootstrap";
import styles from "./FriendsButton.module.css";
import { postToServer } from "../../../../utils/dataBaseUtils";
import { FriendsContext, UserDataContext } from "../../../../src/App";
import FriendRequest from "../FriendRequest/FriendRequest";
import FriendLabel from "../FriendLabel/FriendLabel";

const FriendsButton = ({ className }) => {
  const {
    userData: { user },
  } = useContext(UserDataContext);
  const { localFriendsList, localFriendRequests } = useContext(FriendsContext);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong!");
  // These handle showing the drop down.
  const [show, setShow] = useState(false);
  const toggleDropdown = () => setShow(!show);

  //State for Friend Input
  const [friendEmailInput, setFriendEmailInput] = useState("");

  //Function for submitting friend request
  const sendFriendRequest = async (event) => {
    event.preventDefault();

    if (friendEmailInput === user.primaryEmailAddress.emailAddress) {
      setShowError(true);
      setErrorMessage("Input an email address besides yourself!");
      return;
    }

    if (localFriendsList.includes(friendEmailInput)) {
      setShowError(true);
      setErrorMessage("Input an email address not in your friend's list!");
      return;
    }

    const res = await postToServer({
      bodyData: {
        requestedFriend: friendEmailInput,
        userEmail: user.primaryEmailAddress.emailAddress,
      },
      linkExtender: `/api/user-data/${user.id}/friends/requests`,
    });

    if (!res.success) {
      setErrorMessage("Enter an existing email address on CalenPlan!");
      setShowError(true);
    } else {
      setShowError(false);
      setFriendEmailInput("");
    }
  };

  return (
    <>
      <div className={styles.DropDownContainer}>
        <img
          className={`${className} ${styles.FriendsButton}`}
          src="front_end\src\assets\General\group.svg"
          onClick={toggleDropdown}
        />
        <Dropdown show={show} onToggle={toggleDropdown} align="end">
          <Dropdown.Menu
            className={`${styles.DropDownPosition} ${styles.CustomMenu}`}
          >
            <Tabs defaultActiveKey="friends" className={styles.BoldTabTitle}>
              <Tab eventKey="friends" title="Friends">
                <div className={styles.FriendsList}>
                  {localFriendsList.map((friendEmail) => {
                    return (
                      <FriendLabel
                        key={friendEmail}
                        friendEmail={friendEmail}
                      />
                    );
                  })}
                </div>
              </Tab>
              <Tab eventKey="requests" title="Requests">
                <div className={styles.RequestList}>
                  {localFriendRequests.map((requesterEmail) => {
                    return (
                      <FriendRequest
                        key={requesterEmail}
                        requesterEmail={requesterEmail}
                      />
                    );
                  })}
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
            {showError && <p className={styles.EmailError}>{errorMessage}</p>}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
};

export default FriendsButton;
