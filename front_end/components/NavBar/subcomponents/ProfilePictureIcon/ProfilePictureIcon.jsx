import React, { useContext, useEffect, useState } from "react";

import styles from "./ProfilePictureIcon.module.css";
import { UserDataContext } from "../../../../src/App.jsx";
import { Dropdown, Modal } from "react-bootstrap";
import { SignOutButton } from "@clerk/clerk-react";
import RoundedBar from "../../../RoundedBar/RoundedBar.jsx";

const ProfilePictureIcon = ({ className }) => {
  const [userProfilePictureURL, setUserProfilePictureURL] = useState(
    "front_end/src/assets/Temp/profile_picture.jpg"
  );

  const {
    userData: { user },
  } = useContext(UserDataContext);
  useEffect(() => {
    if (user) {
      setUserProfilePictureURL(user.imageUrl);
    }
  }, [user]);

  const [show, setShow] = useState(false);
  const toggleDropdown = () => setShow(!show);

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className={styles.DropDownContainer}>
        <img
          className={`${styles.ProfilePictureIcon} ${className}`}
          src={userProfilePictureURL}
          onClick={toggleDropdown}
        />

        <Dropdown show={show} onToggle={toggleDropdown} align="end">
          <Dropdown.Menu
            className={`${styles.DropDownPosition} ${styles.CustomMenu}`}
          >
            <SignOutButton>
              <p className={`${styles.DropDownOption}`}>Sign Out</p>
            </SignOutButton>
            <p className={`${styles.DropDownOption}`} onClick={handleShow}>
              Set Address
            </p>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Body>
          <div className={styles.DisplayLimiter}>
            <div className={styles.SetAddressContainer}>
              <p className={styles.SetAddress}>Set Address</p>
              <RoundedBar width="9rem" />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProfilePictureIcon;
