import React, { useState } from 'react';
import './Profile.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Profile = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaveType, setLeaveType] = useState('fullDay'); // Default leave type
  const [leaveBalance, setLeaveBalance] = useState(2); // Initial leave balance
  const [leaveDays, setLeaveDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChangeStart = (e) => {
    setStartDate(e.target.value);
  };

  const handleChangeEnd = (e) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end - start;
    const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1; // Calculate the number of days including start and end date
    let finalDeduction = dayDifference;

    // If it's a single-day leave, apply either 1 (full-day) or 0.5 (half-day) deduction
    if (dayDifference === 1) {
      finalDeduction = leaveType === 'fullDay' ? 1 : 0.5;
    }

    // Ensure leave balance cannot go negative
    if (leaveBalance >= finalDeduction) {
      setLeaveBalance(prevBalance => prevBalance - finalDeduction);

      // Store each leave day
      const leaveDates = [];
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        leaveDates.push(new Date(d));
      }
      setLeaveDays(prevDays => [...prevDays, ...leaveDates]);

      // Reset inputs
      setStartDate('');
      setEndDate('');
      setLeaveType('fullDay');
    } else {
      alert("Insufficient leave balance");
    }
  };

  const handleLeaveType = (e) => {
    setLeaveType(e.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Apply Leave</h1>
        <div className="col">
          <form onSubmit={handleSubmit}>
            <div className="inputs Leave-inputs mt-5">
              <label className='form-label'>Starts From</label>
              <input
                type="date"
                className='form-control'
                value={startDate}
                onChange={handleChangeStart}
              />
            </div>

            <div className="inputs Leave-inputs mt-3">
              <label className='form-label'>End Date</label>
              <input
                type="date"
                className='form-control'
                value={endDate}
                onChange={handleChangeEnd}
              />
            </div>

            {startDate === endDate && startDate !== '' && (
              <div className="inputs Leave-inputs mt-3">
                <label htmlFor="leaveType" className='form-label'>Day</label>
                <select
                  id="leaveType1"
                  className='form-control'
                  value={leaveType}
                  onChange={handleLeaveType}
                >
                  <option value="fullDay">Full Day</option>
                  <option value="halfDay">Half Day</option>
                </select>
              </div>
            )}

            <button className='btn btn-primary mt-3' type="submit">
              Submit Leave
            </button>

            <div className="balance mt-5">
              <p>Leave Balance: {leaveBalance.toFixed(1)}</p>
            </div>
          </form>
        </div>

        <div className="col">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            inline
            highlightDates={leaveDays}
            dayClassName={(date) => 
              leaveDays.some(day => day.toDateString() === date.toDateString()) ? 'highlight-leave' : undefined
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
