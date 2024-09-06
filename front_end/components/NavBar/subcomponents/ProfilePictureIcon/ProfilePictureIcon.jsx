import React, { useContext, useEffect, useState } from "react";

import styles from "./ProfilePictureIcon.module.css";
import { UserDataContext } from "../../src/App";

const ProfilePictureIcon = ({ className }) => {
  const [userProfilePictureURL, setUserProfilePictureURL] = useState(
    "front_endsrcassetsTempprofile_picture.jpg"
  );
  const {
    userData: { user },
  } = useContext(UserDataContext);
  useEffect(() => {
    if (user) {
      setUserProfilePictureURL(user.imageUrl);
    }
  }, [user]);

  return (
    <img
      className={`${styles.ProfilePictureIcon} ${className}`}
      src={userProfilePictureURL}
    />
  );
};

export default ProfilePictureIcon;
