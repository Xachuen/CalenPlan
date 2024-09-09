import React from "react";

import styles from "./RoundedBar.module.css";

const RoundedBar = ({
  width = "4rem",
  height = "0.4rem",
  backgroundColor = "#5B5E76",
}) => {
  return (
    <div
      className={styles.RoundedBar}
      style={{ width: width, height: height, backgroundColor: backgroundColor }}
    ></div>
  );
};

export default RoundedBar;
