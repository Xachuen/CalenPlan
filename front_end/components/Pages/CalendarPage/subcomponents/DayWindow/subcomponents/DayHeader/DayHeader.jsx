import React, { useContext, useState } from 'react';

import styles from './DayHeader.module.css';
import { DisplayMonthContext, EventsDataContext } from '../../../../../../../src/App';

import { weekdayName } from '../../../../../../../utils/dateUtils';
import { useNavigate } from 'react-router-dom';

import { getMinutesAway } from '../../../../../../../utils/dateUtils';

import { Modal, Button, Dropdown } from 'react-bootstrap';

import { UserDataContext } from '../../../../../../../src/App';

const DayHeader = () => {

  function formatTime(inputTime) {
    // Split the input time into hours and minutes
    let [hours, minutes] = inputTime.split(':').map(Number);

    // Determine the period (AM/PM) and adjust hours
    let period = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM

    // Format minutes to ensure two digits
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Combine hours, minutes, and period into the final format
    return `${hours}:${minutes}${period}`;
  }

  const { eventsData, setEventsData } = useContext(EventsDataContext);
  const UserData = useContext(UserDataContext);
  const { user, isSignedIn, isLoaded } = UserData;
  const navigate = useNavigate();
  const { displayMonth } = useContext(DisplayMonthContext);
  
  /* Modal handler */
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const submitEventCreation = async (event) => {
    event.preventDefault();
    handleClose();
    
    const date_id = `${displayMonth.getFullYear()}-${displayMonth.getMonth()+1}-${displayMonth.getDate()}`;

    // Add the event to the dictionary of lists that have the data.
    console.log(selectedStartTime);
    console.log(typeof selectedStartTime);

    const [hour] = selectedStartTime.split(':');
    const hourNumber = parseInt(hour, 10);
    
    const updatedEventsData = {
      ...eventsData,
      [date_id]: {
          ...(eventsData[date_id] || {}),
          [hourNumber]: [
              ...(eventsData[date_id] && eventsData[date_id][hourNumber]
                  ? eventsData[date_id][hourNumber]
                  : []),
              {
                  minuteLength: getMinutesAway(selectedStartTime, selectedEndTime),
                  minuteStart: getMinutesAway(hour + ":00", selectedStartTime),
                  eventName: eventName,
                  eventDescription: eventDescription,
                  eventTime: `${formatTime(selectedStartTime)} to ${formatTime(selectedEndTime)}`,
                  seen: [user.id]
              }
          ]
      }
  };

    setEventsData(updatedEventsData);

    console.log("here:");
    console.log(updatedEventsData);
    console.log(user.id);

    try {
      const response = await fetch(`http://localhost:3000/api/user-data`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: user.id,
            calendar_data: updatedEventsData
        }),


      });
      if (!response.ok) {
          throw new Error('Failed to update calendar data');
      }

      const result = await response.json();
      console.log('Update successful:', result);
      } catch (error) {
          console.error('Error updating calendar data:', error);
      }
    }

  /* Modal event selection */
  const [ selectedEvent, setSelectedEvent ] = useState('');
  function cEventChangeSelection(event) {
    setSelectedEvent(event.target.value);
  }

  /* Time selection */
  const [ selectedStartTime, setSelectedStartTime ] = useState('');
  const [ selectedEndTime, setSelectedEndTime ] = useState('');
  
  /* Event naming */
  const [ eventName, setEventName ] = useState('');
  
  /* Event description */
  const [ eventDescription, setEventDescription ] = useState('');

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

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Body>
          <form onSubmit={submitEventCreation} autoComplete='off'>
            <h3 className={styles.CreateEventTitle}>Create Event</h3>
            <div className={styles.EventCreationElement}>

              <span>Event Title: </span>
              <input id="event-name"
              value={eventName}
              maxLength="20"
              required
              onChange={(event)=>{setEventName(event.target.value)}}/>

            </div>

            <div className={styles.EventCreationElement}>

              <span>Description: </span>
              <input
              type="text"
              maxLength="50"
              value={eventDescription}
              onChange={(event) => setEventDescription(event.target.value)}
              />

            </div>

            <div className={styles.EventCreationElement}>

              <span>Time: </span>
              <input id="start-appt-time"
              type="time"
              value={selectedStartTime}
              required
              onChange={(event)=>{
                setSelectedStartTime(event.target.value)
                if (!selectedEndTime) {
                  const [ hour, minute ] = event.target.value.split(':')
                  const hourJump = (parseInt(hour) + 1).toString().padStart(2, '0') + ':' + minute; 
                  setSelectedEndTime(hourJump)
                }
              }}/>
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
            <button className={styles.CloseButton} type="button" onClick={handleClose}>
              Close
            </button>
            <button className={`${styles.CreateButton}`} type="submit">
              Add
            </button>
 
        {/* Location, Description, Time, Title */}
          </form>

        </Modal.Body>
      </Modal>
    </>

   );
}
 
export default DayHeader;
