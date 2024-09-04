import React, { useContext } from "react";
import styles from "./MemberLabel.module.css";
import { shortenEmail } from "../../../../utils/friendUtils";
import { UserDataContext } from "../../../../src/App";
import { postToServer } from "../../../../utils/dataBaseUtils";

const MemberLabel = ({ memberEmail }) => {
  const { userData, setUserData } = useContext(UserDataContext);
  const { user } = userData;
  const removeMember = () => {
    postToServer({
      bodyData: {
        deletedMemberEmail: memberEmail,
        userEmail: user.primaryEmailAddress.emailAddress,
      },
      linkExtender: "/api/user-data/:userId/members/remove",
    });

    // Handle members locally
    setUserData({
      ...userData,
      members: userData.members.filter(
        (listedMemberEmail) => listedMemberEmail !== memberEmail
      ),
    });
  };

  return (
    <form className={styles.MemberLabel} onSubmit={removeMember}>
      <p className={styles.MemberEmail}>{shortenEmail(memberEmail)}</p>
      <div>
        {memberEmail !== user.primaryEmailAddress.emailAddress && (
          <button className={styles.DeleteButton} type="submit">
            X
          </button>
        )}
      </div>
    </form>
  );
};

export default MemberLabel;
