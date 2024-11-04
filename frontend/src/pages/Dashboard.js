import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../context/authcontext';
import axios from 'axios'; // Make sure axios is imported correctly
import './Dashboard.css'
import { useNavigate } from 'react-router-dom';


const SmallCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const { user, loading } = useAuth()

    const navigate = useNavigate()


    const [employee, setEmployee] = useState([])
    const [leaveDays, setLeaveDays] = useState([])
    const [leaveBalance, setLeaveBalance] = useState(2);
    const [upcomingEvents, setUpcomingEvents] = useState([]);


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

                const events = employees.filter(employee => {
                    const birthDate = new Date(employee.dob);
                    const joiningDate = new Date(employee.doj);

                console.log(events)


                    return birthDate.getMonth() === currentMonth || joiningDate.getMonth() === currentMonth;
                });


                const birthdays = events.filter(event => new Date(event.dob).getMonth()  === currentMonth);
                const joiningAnniversaries = events.filter(event => new Date(event.doj).getMonth() === currentMonth);



                setUpcomingEvents({ birthdays, joiningAnniversaries });

            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployeeData();
    }, []);


    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }
    const holidays = [
        new Date(2024, 0, 26),   // Republic Day (January 26)
        new Date(2024, 3, 10),   // Ugadi (April 10)
        new Date(2024, 3, 14),   // Dr. Ambedkar Jayanti (April 14)
        new Date(2024, 3, 17),   // Ram Navami (April 17)
        new Date(2024, 3, 21),   // Mahavir Jayanti (April 21)
        new Date(2024, 3, 22),   // Good Friday (April 22)
        new Date(2024, 4, 1),    // May Day / Labour Day (May 1)
        new Date(2024, 7, 15),   // Independence Day (August 15)
        new Date(2024, 8, 16),   // Ganesh Chaturthi (September 16)
        new Date(2024, 9, 2),    // Mahatma Gandhi Jayanti (October 2)
        new Date(2024, 9, 11),   // Vijaya Dashami (October 11)
        new Date(2024, 9, 20),   // Eid-e-Milad (October 20)
        new Date(2024, 10, 1),   // Diwali (November 1)
        new Date(2024, 10, 3),   // Bhai Dooj (November 3)
        new Date(2024, 10, 15),  // Guru Nanak Jayanti (November 15)
        new Date(2024, 11, 25)   // Christmas (December 25)
    ]
    return (

        <>
            <div className="DashboardPage container mb-5">
                <h1 className='heading text-center mb-4'>Dashboard</h1>
                <div className="row">
                    <div className="col">
                        <div className="card" >
                            <div className="card-body">
                                <h5 className="card-title">Total Employees : {employee.length}</h5>
                                <a href="#" className="btn " onClick={() => { navigate('/Employees') }}>See Employee Details</a>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card" >
                            <div className="card-body">
                                <h5 className="card-title">Leave  Balance : {leaveBalance}</h5>
                                <a href="#" className="btn " onClick={() => { navigate('/Profile') }} >See Leave Details Details</a>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <h1 className='text-center mt-5'>Upcoming Events</h1>

                    <div className="col border me-2">

                        <div className="birthday">
                            <h1 className='mt-2'>Birthdays:</h1>
                            <span>
                                {upcomingEvents.birthdays.map((event, index) => (
                                    <div key={index}>{new Date(event.dob).toLocaleDateString()} {event.name}

                                    </div>
                                ))}
                            </span>
                        </div>


                        <div className="joiningDay">
                            <h1 className='mt-2'>Joining Anniversary:</h1>
                            <span>
                                {upcomingEvents.joiningAnniversaries.map((event, index) => (
                                    <div key={index}>{new Date(event.doj).toLocaleDateString()} {event.name}

                                    </div>
                                ))}
                            </span>
                        </div>

                    </div>

                    <div className="col border">
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            inline
                            highlightDates={holidays}
                            dayClassName={(date) => date.getDay() === 0 ? 'highlight-sunday' : undefined}
                        />
                    </div>
                </div>



            </div>
        </>
    );
};

export default SmallCalendar;
