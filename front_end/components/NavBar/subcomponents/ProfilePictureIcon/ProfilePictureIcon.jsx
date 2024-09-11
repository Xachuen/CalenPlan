import React, { useContext, useEffect, useState } from "react";

import styles from "./ProfilePictureIcon.module.css";
import { UserDataContext } from "../../../../src/App.jsx";
import { Dropdown, Modal } from "react-bootstrap";
import { SignOutButton } from "@clerk/clerk-react";
import RoundedBar from "../../../RoundedBar/RoundedBar.jsx";
import AddressSearchBar from "../../../AddressSearchBar/AddressSearchBar.jsx";
import { postToServer, putInServer } from "../../../../utils/dataBaseUtils.js";

const ProfilePictureIcon = ({ className }) => {
  const [userProfilePictureURL, setUserProfilePictureURL] = useState(
    "front_end/src/assets/Temp/profile_picture.jpg"
  );

  const {
    setUserData,
    userData,
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
    setSearchSession("");
    setShowModal(false);
  };
  const handleShow = () => {
    setShowModal(true);
  };

  // Address Functions
  const [searchSession, setSearchSession] = useState("");

  const clickAddress = (placeObj) => {
    // Save the address to the data.
    setUserData({ ...userData, address: placeObj.address });
    putInServer({
      bodyData: { newAddress: placeObj.address },
      linkExtender: `/api/user-data/${user.id}/address`,
    });
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
              <p className={styles.SetAddress}>Set Address:</p>
              <RoundedBar width="9rem" />
            </div>
          </div>
          <div className={styles.SearchContainer}>
            <AddressSearchBar
              clickAddress={clickAddress}
              searchSessionData={[searchSession, setSearchSession]}
              defaultValue={userData.address}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProfilePictureIcon;
