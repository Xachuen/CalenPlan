import React from "react";
import { useContext, useState } from "react";

import {
  DisplayMonthContext,
  EventsDataContext,
} from "../../../../../../../src/App";

import styles from "./DayRow.module.css";
import EventBlock from "../EventBlock/EventBlock";

const DayRow = ({ hour, strRep, hourLabel, timeDivide }) => {
  // Contexts
  const { eventsData, setEventsData } = useContext(EventsDataContext);
  const { displayMonth, setDisplayMonth } = useContext(DisplayMonthContext);

  // Date
  const date_id = `${displayMonth.getFullYear()}-${displayMonth.getMonth() + 1}-${displayMonth.getDate()}`;

  return (
    <>
      <div className={styles.DayRow}>
        {/* {console.log(strRep, hourLabel, timeDivide)} */}
        {eventsData[date_id] &&
          eventsData[date_id][hour - 1] &&
          eventsData[date_id][hour - 1].map((dateEventObj, index) => {
            return (
              <EventBlock
                date={date_id}
                hour={hour - 1}
                index={index}
                key={crypto.randomUUID()}
                minuteLength={dateEventObj.minuteLength}
                creator={dateEventObj.creator}
                minuteStart={dateEventObj.minuteStart}
                eventName={dateEventObj.eventName}
                eventTime={dateEventObj.eventTime}
                eventDescription={dateEventObj.eventDescription}
                eventAddress={dateEventObj.addressText}
                eventCoordinates={dateEventObj.addressCoords}
              />
            );
          })}
        <span className={styles.DayRowText}>{strRep}</span>
      </div>
    </>
  );
};

export default DayRow;
