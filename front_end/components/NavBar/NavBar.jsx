import React from "react";
import styles from "./NavBar.module.css";
import Logo from "../Logo/Logo";
import ProfilePictureIcon from "./subcomponents/ProfilePictureIcon/ProfilePictureIcon.jsx";
import FriendsButton from "./subcomponents/FriendsButton/FriendsButton";
import NotificationButton from "./subcomponents/NotificationButton/NotificationButton";
import CalendarButton from "./subcomponents/CalendarButton/CalendarButton";
import { SignedIn } from "@clerk/clerk-react";
import MonthTitle from "./subcomponents/MonthTitle/MonthTitle";

const NavBar = () => {
  return (
    <nav className={styles.NavBar}>
      <div className={`${styles.NavLeft}`}>
        <Logo className={`${styles.LogoNavBar} ${styles.NavItem}`} />
      </div>

      <div className={`${styles.NavCenter}`}>
        <SignedIn>
          <MonthTitle />
        </SignedIn>
      </div>

      <div className={`${styles.NavRight}`}>
        <FriendsButton
          className={`${styles.NavItem} ${styles.NavItemButton}`}
        />
        {/* <NotificationButton
          className={`${styles.NavItem} ${styles.NavItemButton}`}
        /> */}
        <CalendarButton
          className={`${styles.NavItem} ${styles.NavItemButton}`}
        />
        <ProfilePictureIcon
          className={`${styles.ProfileNavBar} ${styles.NavItem} ${styles.NavItemButton}`}
        />
      </div>
    </nav>
  );
};

export default NavBar;
