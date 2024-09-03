import React from "react";

import styles from "./MemberLabel.module.css";
import { shortenEmail } from "../../../../utils/friendUtils";

const MemberLabel = ({ memberEmail }) => {
  const removeMember = () => {};

  return (
    <form className={styles.MemberLabel} onSubmit={removeMember}>
      <p className={styles.MemberEmail}>{shortenEmail(memberEmail)}</p>
      <div>
        <button className={styles.DeleteButton} type="submit">
          X
        </button>
      </div>
    </form>
  );
};

export default MemberLabel;
