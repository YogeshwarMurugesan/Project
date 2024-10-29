import React, { useState } from 'react';
import './Profile.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

const localizer = momentLocalizer(moment);

const Profile = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [leaveBalance, setLeaveBalance] = useState(2);
  const [leaveDays, setLeaveDays] = useState([]);
  const [events, setEvents] = useState([]);

  const handleChane = (e) => {
    setStartDate(e.target.value);
  };

  const handleChangeEnd = (e) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const start = new Date(startDate);
    const end = new Date(endDate);

    const timeDifference = end - start;
    const dayDifference = timeDifference / (1000 * 3600 * 24) + 1;

    let finalDeduction = dayDifference;

    if (dayDifference === 1) {
      finalDeduction = leaveType === 'fullDay' ? 1 : 0.5;
    }

    if (finalDeduction <= leaveBalance) {
      setLeaveBalance((prevBalance) => prevBalance - finalDeduction);

      const leaveDates = [];
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        leaveDates.push(new Date(d));
      }
      setLeaveDays((prevDays) => [...prevDays, ...leaveDates]);

      const newEvents = leaveDates.map((date) => ({
        title: `Leave ${leaveType}`,
        start: new Date(date),
        end: new Date(date),
        allDay: true,
      }));
      setEvents((prevEvents) => [...prevEvents, ...newEvents]);

      try {
        await axios.post('http://localhost:3001/profile', {
          startDate,
          endDate,
          leaveType
        });
        console.log("Leave submitted successfully!");
      } catch (error) {
        console.error("Error submitting leave:", error);
      }
    }
  };

  const handleLeaveType = (e) => {
    setLeaveType(e.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="heading">Apply Leave</h1>
        <div className="col">
          <form onSubmit={handleSubmit}>
            <div className="inputs Leave-inputs mt-5">
              <label className="form-label">Starts From</label>
              <input
                type="date"
                className="form-control"
                name="startDate"
                value={startDate}
                onChange={handleChane}
              />
            </div>

            <div className="inputs Leave-inputs mt-3">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                name="endDate"
                value={endDate}
                onChange={handleChangeEnd}
              />
            </div>

            {startDate === endDate && startDate !== '' ? (
              <div className="inputs Leave-inputs mt-3">
                <label htmlFor="leaveType" className="form-label">Day</label>
                <select
                  id="leaveType1"
                  className="form-control"
                  value={leaveType}
                  onChange={handleLeaveType}
                >
                  <option value="Select">Select</option>
                  <option value="fullDay">Full Day</option>
                  <option value="halfDay">Half Day</option>
                </select>
              </div>
            ) : null}

            <button type="submit" className="btn btn-primary mt-3">
              Submit Leave
            </button>

            <div className="balance mt-5">
              <p>Leave Balance: {leaveBalance}</p>
            </div>
          </form>
        </div>

        <div className="col">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ marginTop: '20px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
