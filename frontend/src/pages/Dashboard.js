import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAuth } from '../context/authcontext';
import axios from 'axios'; // Make sure axios is imported correctly
import './Dashboard.css'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import the motion component


const localizer = momentLocalizer(moment);

const SmallCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const { user, loading } = useAuth()

    const navigate = useNavigate()


    const [employee, setEmployee] = useState([])
    const [leaveDays, setLeaveDays] = useState([])
    const [leaveBalance, setLeaveBalance] = useState(24);
    const [upcomingEvents, setUpcomingEvents] = useState({ birthdays: [], joiningAnniversaries: [] });


    useEffect(() => {
        axios.get('http://localhost:3001/Employees')
            .then((res) => {
                setEmployee(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        const fetchLeave = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/profile/${user?.email || user?._id}`);
                const leaveData = await response.data

                setLeaveDays(leaveData);
                const totalLeaveTaken = leaveData.reduce((acc, leave) => {
                    const leaveDuration = Math.ceil((new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 3600 * 24) + 1);
                    return acc + (leave.leaveType === 'halfDay' ? 0.5 : leaveDuration);
                }, 0);

                setLeaveBalance((prevBalance) => prevBalance - totalLeaveTaken);

            } catch (error) {
                console.error("Error fetching leave data:", error);
            }
        };

        if (user?.email || user?._id) {
            fetchLeave();
        }


    }, [user]);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/Dashboard');
                const employees = response.data;

                const currentMonth = new Date().getMonth() + 1;


                const birthdays = employees.filter(employee => {
                    const birthDate = new Date(employee.dob);
                    return birthDate.getMonth() + 1 === currentMonth;
                });


                const joiningAnniversaries = employees.filter(employee => {
                    const joiningDate = new Date(employee.doj);
                    const birthDate = new Date(employee.dob);
                    return joiningDate.getMonth() + 1 === currentMonth && birthDate.getMonth() + 1 !== currentMonth;
                });

                setUpcomingEvents({ birthdays, joiningAnniversaries });

            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployeeData();
    }, []);



    // if (loading) {
    //     return (
    //         <h1>Loading...</h1>
    //     )
    // }
    const calendarEvents = [
        {
            title: 'New Year\'s Day',
            start: new Date(2024, 0, 1), // January 1, 2024
            end: new Date(2024, 0, 1),
            allDay: true
        },
        {
            title: 'Independence Day',
            start: new Date(2024, 6, 4), // July 4, 2024
            end: new Date(2024, 6, 4),
            allDay: true
        },
        {
            title: 'Thanksgiving Day',
            start: new Date(2024, 10, 28), // November 28, 2024 (Fourth Thursday in November)
            end: new Date(2024, 10, 28),
            allDay: true
        },
        {
            title: 'Christmas Day',
            start: new Date(2024, 11, 25), // December 25, 2024
            end: new Date(2024, 11, 25),
            allDay: true
        }
    ];

    return (

        <>
            <div className="DashboardPage container mb-5">
    <h1 className='heading text-center mb-4'>Dashboard</h1>
    <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
            <div className="card">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="card-body">
                        <h5 className="card-title">Total Employees : {employee.length}</h5>
                        <a href="#" className="btn" onClick={() => { navigate('/Employees') }}>See Employee Details</a>
                    </div>
                </motion.div>
            </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
            <div className="card">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="card-body">
                        <h5 className="card-title">Leave  Balance : {leaveBalance}</h5>
                        <a href="#" className="btn" onClick={() => { navigate('/Profile') }} >See Leave Details</a>
                    </div>
                </motion.div>
            </div>
        </div>
    </div>

    <div className="row">
        <h1 className='text-center mt-5 heading'>Upcoming Events</h1>
        <div className="col-lg-6 col-md-12 mb-3 eventBox">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7 }}
            >
                <div className="birthday">
                    <h4 className='mt-2'>Birthdays:  </h4>
                    <span>
                        {upcomingEvents.birthdays.map((event, index) => (
                            <h6 className='mt-2 color-dark' key={index}>{new Date(event.dob).toLocaleDateString()} {event.name}</h6>
                        ))}
                    </span>
                </div>
                <hr />
                <div className="joiningDay">
                    <h4 className='mt-2'>Joining Anniversary:</h4>
                    <span>
                        {upcomingEvents.joiningAnniversaries.map((event, index) => (
                            <div key={index}>{new Date(event.doj).toLocaleDateString()} {event.name}</div>
                        ))}
                    </span>
                </div>
            </motion.div>
        </div>

        <div className="col-lg-6 col-md-12 mb-3 calbox">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7 }}
            >
                <Calendar
                    localizer={localizer}
                    events={calendarEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                />
            </motion.div>
        </div>
    </div>
</div>

        </>
    );
};

export default SmallCalendar;
