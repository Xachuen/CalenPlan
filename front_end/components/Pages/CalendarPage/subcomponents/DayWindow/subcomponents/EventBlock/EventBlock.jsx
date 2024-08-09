import React, { useState } from 'react';

import styles from './EventBlock.module.css';
import { Modal } from 'react-bootstrap';

const EventBlock = ( { eventName, eventDescription, eventTime, minuteLength, minuteStart } ) => {
  // States  
  const [ showModal, setShowModal ] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <div className={`${styles.TitleContainer}`}>
            <h3 className={`${styles.EventNameModal}`}>{eventName}</h3>
            <p className={`${styles.EventTimeModal}`}>{eventTime}</p>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className={`${styles.DescriptionContainer}`}>
            <p className={`${styles.EventDescriptionModal}`}>{eventDescription}</p>
          </div>
        </Modal.Body>
      </Modal>

      <div onClick={() => handleShow()} className={styles.EventBlock} style={{height: `${minuteLength >= 25 && minuteLength * 0.17}rem`, top: `${minuteStart * 0.17}rem`}}>
        <p className={`${styles.EventName} ${minuteLength < 25 && styles.SmallerText}`}>{eventName}</p>
        <p className={`${styles.EventTime} ${minuteLength < 25 && styles.SmallerText}`}>{eventTime}</p>
      </div>
    </>
   );
}
 
export default EventBlock;