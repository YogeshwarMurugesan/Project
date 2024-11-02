import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../context/authcontext';
import axios from 'axios'; // Make sure axios is imported correctly

const SmallCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const { user, loading } = useAuth()

    const [employee,setEmployee] = useState([])
    const [leave, setLeave] = useState('')

    useEffect(() => {
        axios.get('http://localhost:3001/Employees')
            .then((res) => {
                setEmployee(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    

    
    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }
    console.log(user.name)
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
            <div className="container mb-5">
                <h1 className='heading text-center mb-4'>Dashboard</h1>
                <div className="row">
                    <div className="col">
                        <div class="card" >
                            <div class="card-body">
                                <h5 class="card-title">Total Employees : {employee.length}</h5>
                                <a href="#" class="btn btn-primary">See Employee Details</a>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div class="card" >
                            <div class="card-body">
                                <h5 class="card-title">Leave  Balance : {leave}</h5>
                                <a href="#" class="btn btn-primary">See Leave Details Details</a>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                inline
                highlightDates={holidays}
                dayClassName={(date) => date.getDay() === 0 ? 'highlight-sunday' : undefined}
            />
        </>
    );
};

export default SmallCalendar;
