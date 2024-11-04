import React, { useEffect, useState } from 'react';
import './Profile.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { useAuth } from '../context/authcontext';
import { motion } from 'framer-motion';

const localizer = momentLocalizer(moment);

const Profile = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [leaveBalance, setLeaveBalance] = useState(2);
  const [leaveDays, setLeaveDays] = useState([]);
  const [events, setEvents] = useState([]);


  const { user } = useAuth();


  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/profile/${user?.email || user?._id}`);
        const leaveData = await response.data

        // console.log(`${user?.email || user?._id}`)

        console.log(leaveData)


        setLeaveDays(leaveData);
        const totalLeaveTaken = leaveData.reduce((acc, leave) => {
          const leaveDuration = Math.ceil((new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 3600 * 24) + 1);
          return acc + (leave.leaveType === 'halfDay' ? 0.5 : leaveDuration);
        }, 0);

        setLeaveBalance((prevBalance) => prevBalance - totalLeaveTaken);

        const leaveEvents = response.data.map((leave) => ({
          title: `L-${leave.leaveType}`,
          start: new Date(leave.startDate),
          end: new Date(leave.endDate),
          allDay: true,
        }));
        setEvents(leaveEvents);
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };

    if (user?.email || user?._id) {
      fetchLeave();
    }


  }, [user]);

  const handleChane = (e) => {
    setStartDate(e.target.value);
  };

  const handleChangeEnd = (e) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const details = {
        startDate,
        endDate,
        leaveType,
        user: { email: user?.email || user?._id }
      };

      await axios.post('http://localhost:3001/profile', details);

      console.log(details);


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

        // Add each leave date to events for the calendar
        const newEvents = leaveDates.map((date) => ({
          title: `L- ${leaveType}`,
          start: new Date(date),
          end: new Date(date),
          allDay: true,
        }));
        setEvents((prevEvents) => [...prevEvents, ...newEvents]);
      }
    } catch (error) {
      console.error("Error submitting leave:", error);
    }
  };

  const hadleLeaveType = (e) => {
    setLeaveType(e.target.value);
  };


  return (
    <div className="container profile-page">
      <div className="row ">
        <h1 className="heading text-center">Apply Leave</h1>
        <motion.div
          className="row"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="col col-lg-6 com-sm-12 leaveBox-container">
            <h2 className='heading text-center'>Leave Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputs Leave-inputs ">
                <label htmlFor="" className="form-label" id='heading2'>Starts From</label>
                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                  value={startDate}
                  onChange={handleChane}
                />
              </div>

              <div className="inputs Leave-inputs mt-3">
                <label htmlFor="" className="form-label" id='heading2'>End Date</label>
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
                  <label htmlFor="leaveType" className="form-label" id='heading2'>Day</label>
                  <select
                    id="leaveType1"
                    className="form-control"
                    value={leaveType}
                    onChange={hadleLeaveType}
                  >
                    <option value="Select">Select</option>
                    <option value="fullDay">Full Day</option>
                    <option value="halfDay">Half Day</option>
                  </select>
                </div>
              ) : null}

              <div className="inputs Leave-inputs mt-3">
                <label htmlFor="leaveReason" className="form-label" id='heading2'>Type</label>
                <select id="leaveReason" className="form-control">
                  <option value="sick">Sick Leave</option>
                  <option value="casual">Casual Leave</option>
                  <option value="other">Other</option>
                </select>
              </div>


              <button type="submit" className="btn btn-primary mt-3 ">Submit Leave</button>

              <div className="balance mt-5">
                <p>Leave Balance: {leaveBalance}</p>
              </div>
            </form>

          </div>

          <div className="col col-lg-6 com-sm-12">
            <Calendar
              className="calendar-container"
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500, marginTop: '20px' }}
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="row"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="row mt-5 border p-5">
          <div className="col">

            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>NO</th>
                  <th>Leave Date</th>
                  <th>Leave Type</th>
                </tr>
              </thead>
              <tbody>
                {leaveDays.map((day, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{new Date(day.startDate).toLocaleDateString()}</td>
                    <td>{day.leaveType}</td>
                  </tr>
                ))}
              </tbody>
            </table>


          </div>
        </div>
      </motion.div>
    </div>

  );
};

export default Profile;
