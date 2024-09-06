import React, { useState } from "react";

import styles from "./EventBlock.module.css";
import { Modal } from "react-bootstrap";

const EventBlock = ({
  eventName,
  eventDescription,
  eventTime,
  minuteLength,
  minuteStart,
  eventAddress,
  eventCoordinates,
}) => {
  // States
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const deleteEvent = () => {
    handleClose();
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <div className={`${styles.TitleContainer}`}>
            <h3 className={`${styles.EventNameModal}`}>{eventName}</h3>
            <button className={styles.TrashButton} onClick={deleteEvent}>
              <img
                src="front_end/src/assets/General/trash_icon.svg"
                className={styles.TrashImg}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.EventDescriptors}>
            <p className={`${styles.EventTimeModal}`}>
              <img
                className={styles.ClockImage}
                src="front_end/src/assets/General/gray_clock.svg"
              />
              {eventTime}
            </p>
            {eventAddress.length > 0 && (
              <p className={`${styles.EventAddressModal}`}>
                <img
                  className={styles.PinImage}
                  src="front_end/src/assets/General/gray_pin.svg"
                />{" "}
                {eventAddress}
              </p>
            )}
            {eventDescription.length > 0 && (
              <p className={`${styles.EventDescriptionModal}`}>
                <img
                  className={styles.PencilImage}
                  src="front_end/src/assets/General/gray_pencil.svg"
                />{" "}
                {eventDescription}
              </p>
            )}
          </div>
        </Modal.Body>
      </Modal>

      <div
        onClick={() => handleShow()}
        className={styles.EventBlock}
        style={{
          height: `${minuteLength >= 25 && minuteLength * 0.17}rem`,
          top: `${minuteStart * 0.17}rem`,
        }}
      >
        <p
          className={`${styles.EventName} ${minuteLength < 25 && styles.SmallerText}`}
        >
          {eventName}
        </p>
        <p
          className={`${styles.EventTime} ${minuteLength < 25 && styles.SmallerText}`}
        >
          {eventTime}
        </p>
      </div>
    </>
  );
};

export default EventBlock;
