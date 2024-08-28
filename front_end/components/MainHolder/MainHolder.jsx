import React from "react";

import styles from "./MainHolder.module.css";
import StartPage from "../Pages/StartPage/StartPage";

import { SignedIn, SignedOut } from "@clerk/clerk-react";
import CalendarPage from "../Pages/CalendarPage/CalendarPage";

const MainHolder = () => {
  return (
    <>
      <SignedOut>
        <StartPage />
      </SignedOut>
      <SignedIn>
        <CalendarPage />
      </SignedIn>
    </>
  );
};

export default MainHolder;
