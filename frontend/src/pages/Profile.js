import React, { useState } from 'react';
import './Profile.css';
import DatePicker from 'react-datepicker';


const Profile = () => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [leaveType, setLeaveType] = useState('')
  const [leaveBalance, setLeaveBalance] = useState(2)
  const [leaveDays, setLeaveDays] = useState([])

  const [selectedDate, setSelectedDate] = useState(null);


  const handleChane = (e) => {
    setStartDate(e.target.value)
  }

  const handleChangeEnd = (e) => {
    setEndDate(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const start = new Date(startDate)
    const end = new Date(endDate)

    const timeDifference = end - start
    console.log(timeDifference)

    const dayDifference = timeDifference / (1000 * 3600 * 24) + 1;
    console.log(`Start ${start}\n end ${end}\n dayDifference = ${dayDifference}`)

    let finalDeduction = dayDifference

    if (dayDifference === 1) {
      finalDeduction = leaveType === 'fullDay' ? 1 : 0.5
      console.log('leave is less than 1')
    }

    if (finalDeduction <= leaveBalance) {
      setLeaveBalance(prevBalance => prevBalance - finalDeduction)

      const leaveDates = [];
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        leaveDates.push(new Date(d));
      }
      setLeaveDays(prevDays => [...prevDays, ...leaveDates]);
    }


  }

  const hadleLeaveType = (e) => {
    setLeaveType(e.target.value)
    console.log(leaveType)
  }
  return (
    <div className="container ">
      <div className="row">
        <h1 className='heading'>Apply Leave</h1>
        <div className="col">
          <form action="">
            <div className="inputs Leave-inputs mt-5" >
              <label htmlFor="" className='form-label'>
                Starts From
              </label>
              <input type="date"
                className='form-control'
                name='startDate'
                value={startDate}
                onChange={handleChane}
              />
            </div>

            <div className="inputs Leave-inputs mt-3">
              <label htmlFor="" className='form-label'>
                End Date
              </label>
              <input type="date"
                className='form-control'
                name='endDate'
                value={endDate}
                onChange={handleChangeEnd}
              />
            </div>

            {startDate === endDate && startDate !== '' ? (
              <>
                <div className="inputs Leave-inputs mt-3">
                  <label htmlFor="leaveType" className='form-label'>
                    Day
                  </label>
                  <select id="leaveType1" className='form-control' value={leaveType} onChange={hadleLeaveType}>
                    <option value="Select">Select</option>
                    <option value="fullDay">Full Day</option>
                    <option value="halfDay">Half Day</option>
                  </select>
                </div>
              </>
            ) : ('')}

            <div className="inputs Leave-inputs mt-3">
              <label htmlFor="leaveType" className='form-label'>
                Type
              </label>
              <select id="leaveType" className='form-control'>
                <option value="sick">Sick Leave</option>
                <option value="casual">Casual Leave</option>
                <option value="other">Other</option>
              </select>
            </div>


            <button className='btn btn-primary mt-3' onClick={handleSubmit}> Submit Leave </button>

            <div className="balance mt-5">
              <p>Leave Balance : {leaveBalance}</p>
            </div>
          </form>
        </div>

        <div className="col">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            inline
            highlightDates={leaveDays.map(date => ({
              'react-datepicker__day--highlighted': date
            }))}
            dayClassName={(date) =>
              leaveDays.some(d => d.toDateString() === date.toDateString())
                ? 'highlight-custom'
                : undefined}
          />



        </div>
      </div>
    </div>

  )
};

export default Profile;
