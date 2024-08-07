import React, { useContext, useState } from 'react';
import { EventsDataContext } from '../../DayWindow';

import styles from './DayHeader.module.css';
import { DisplayMonthContext } from '../../../../../../../src/App';

import { weekdayName } from '../../../../../../../utils/dateUtils';
import { useNavigate } from 'react-router-dom';

import { Modal, Button, Dropdown } from 'react-bootstrap';

const DayHeader = () => {
  const { eventsData, setEventsData } = useContext(EventsDataContext);

  const navigate = useNavigate();
  const { displayMonth, setDisplayMonth } = useContext(DisplayMonthContext);
  
  /* Modal handler */
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const submitEventCreation = (event) => {
    event.preventDefault();
    handleClose();
    
    const date_id = `${displayMonth.getFullYear()}-${displayMonth.getMonth()}-${displayMonth.getDate()}`;

    // Add the event to the dictionary of lists that have the data.
    console.log(selectedStartTime);
    console.log(typeof selectedStartTime);

    const [hour] = selectedStartTime.split(':');
    const hourNumber = parseInt(hour, 10);
    
    setEventsData(prevEventsData => ({
      ...prevEventsData,
      [date_id]: {
        ...(prevEventsData[date_id] || {}),
        [hourNumber]: [
          ...(prevEventsData[date_id] && prevEventsData[date_id][hourNumber] 
            ? prevEventsData[date_id][hourNumber] 
            : []),
          { something: "something" }
        ]
      }
    }));
  }

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
      {console.log(eventsData)}
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

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitEventCreation}>
           <div className={styles.EventCreationElement}>
              <span>Time: </span>
              <input id="start-appt-time"
              type="time"
              value={selectedStartTime}
              required
              onChange={(event)=>{setSelectedStartTime(event.target.value)}}/>

              <span> to </span>

              <input id="end-appt-time"
                type="time"
                value={selectedEndTime}
                required
                min={selectedStartTime}
                onChange={(event)=>{setSelectedEndTime(event.target.value)}}/>
            </div>
            <div className={styles.EventCreationElement}>
              <span>Event Type: </span>
              <select name="" id="event-type" onChange={ () => { } }>
                <option value="Solo">Solo</option>
                <option value="Group">Group</option>
              </select>
            </div>
            <Button className={styles.CloseButton} variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button className={styles.CreateButton} type="submit" variant="primary">
              Add
            </Button>
 
        {/* Location, Description, Time, Title */}
          </form>

        </Modal.Body>
      </Modal>
    </>

   );
}
 
export default DayHeader;
