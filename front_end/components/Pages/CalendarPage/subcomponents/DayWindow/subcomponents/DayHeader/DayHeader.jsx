import React, { useContext, useState } from 'react';

import styles from './DayHeader.module.css';
import { DisplayMonthContext } from '../../../../../../../src/App';

import { weekdayName } from '../../../../../../../utils/dateUtils';
import { useNavigate } from 'react-router-dom';

import { Modal, Button, Dropdown } from 'react-bootstrap';

const DayHeader = () => {
  const navigate = useNavigate();
  const { displayMonth, setDisplayMonth } = useContext(DisplayMonthContext);
  
  /* Modal handler */
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  /* Modal event selection */
  const [ selectedEvent, setSelectedEvent ] = useState('');
  function cEventChangeSelection(event) {
    setSelectedEvent(event.target.value);
  }

  /* Time selection */
  const [ selectedStartTime, setSelectedStartTime ] = useState('');
  const [ selectedEndTime, setSelectedEndTime ] = useState('');


  return (
    <>
      <div className={styles.DayHeader}>
        <div className={styles.CurrentDayText}>{`${weekdayName[displayMonth.getDay()]}, ${displayMonth.getDate()}`}</div>
        <div className={styles.ImageButtonContainer} onClick={() => {
          navigate("/");
          }}>
          <img className={styles.ArrowImage} src='front_end\src\assets\General\arrow_top_right.svg'/>
        </div> 
        <div className={styles.ImageButtonContainer} onClick={handleShow}>
          <img className={styles.PlusImage} src='front_end\src\assets\General\plus.svg'/>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className={styles.EventCreationElement}>
            <span>Time: </span>
            <input id="appt-time"
             type="time"
             value={selectedStartTime}
             required
             onChange={(event)=>{setSelectedStartTime(event.target.value)}}/>

            <span> to </span>

            <input id="appt-time"
             type="time"
             value={selectedEndTime}
             required
             max={selectedStartTime}
             onChange={(event)=>{setSelectedEndTime(event.target.value)}}/>
          </div>
          <div className={styles.EventCreationElement}>
            <span>Event Type: </span>
            <select name="" id="event-type" onChange={ () => { } }>
              <option value="Solo">Solo</option>
              <option value="Group">Group</option>
            </select>
          </div>

        {/* Location, Description, Time, Title */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>

   );
}
 
export default DayHeader;
