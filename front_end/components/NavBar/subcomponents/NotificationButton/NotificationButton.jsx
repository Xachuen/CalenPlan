import React from "react";

import styles from "./NotificationButton.module.css";

const NotificationButton = ({ className }) => {
  return (
    <img
      className={`${className} ${styles.NotificationButton}`}
      src="front_end\src\assets\General\notification_bell.svg"
    />
  );
};

export default NotificationButton;
