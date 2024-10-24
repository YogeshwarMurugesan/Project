import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import './FullProfile.css'

const FullProfile = () => {
    const { email } = useParams(); 
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
       
        axios.get(`http://localhost:3001/viewProfile/${email}`)
            .then((res) => {
                setEmployee(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [email]);

    if (!employee) return <p>Loading...</p>;

    return (
        <div className="container">

            <h1>{employee.name}'s Profile</h1>
            
            <form action="" className='form'>
                <div className='profile-item my-2'>
                    <label htmlFor="">Name :</label>
                    <input type="text" value={employee.name} className='bg-light form-control w-50 ' />
                </div>

                <div className='profile-item'>
                    <label htmlFor="">Employee Id :</label>
                    <input type="text" value={employee.empid} className='bg-light form-control w-50' />
                </div>

                <div className='profile-item'>
                    <label htmlFor="">Email Id :</label>
                    <input type="text" value={employee.email} className='bg-light form-control w-50' />
                </div>

                <div className='profile-item'>
                    <label htmlFor="">Date of Birth :</label>
                    <input type="date" value={employee.dob} className='bg-light form-control w-50' />
                </div>

                <div className='profile-item'>
                    <label htmlFor="">Phone No:</label>
                    <input type="text" value={employee.phNo} className='bg-light form-control w-50' />
                </div>

                <div className='profile-item'>
                    <label htmlFor="gender">Gender:</label>
                    <select value={employee.gender} className='bg-light form-control ' id="gender" >
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className='profile-item'>
                    <label htmlFor="">Job Role:</label>
                    <input type="text" value={employee.jobTitle} className='bg-light form-control w-50' />
                </div>

                <div className='profile-item'>
                    <label htmlFor="">Department:</label>
                    <input type="text" value={employee.department} className='bg-light form-control w-50' />
                </div>

                <div className='profile-item'>
                    <label htmlFor="">Work Location:</label>
                    <input type="text" value={employee.workLocation} className='bg-light form-control w-50' />
                </div>

                <div className='profile-item'>
                    <label htmlFor="">Date of Joining:</label>
                    <input type="date" value={employee.doj} className='bg-light form-control w-50' />
                </div>

                <div className='profile-item'>
                    <label htmlFor="gender">Employee Type:</label>
                    <select value={employee.empType} className='bg-light form-control ' id="empType" >
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Full-Time</option>
                        <option value="Female">Part-Time</option>
                        <option value="Other">Contract</option>
                    </select>
                </div>

                <div className='profile-item'>
                    <label htmlFor="address">Address:</label>
                    <input type="text" value={employee.address} className='bg-light form-control w-50' readOnly />
                </div>

                <div className='profile-item'>
                    <label htmlFor="address">City:</label>
                    <input type="text" value={employee.city}    className='bg-light form-control w-50' readOnly />
                </div>

                <div className='profile-item'>
                    <label htmlFor="address">State:</label>
                    <input type="text" value={employee.state}   className='bg-light form-control w-50' readOnly />
                </div>

                <div className='profile-item'>
                    <label htmlFor="address">Pincode:</label>
                    <input type="text" value={employee.pinCode}   className='bg-light form-control w-50' readOnly />
                </div>

                <div className='mt-3 ms-5'>
                    <button className='btn btn-success w-50 me-1'>Edit</button>
                    <button className='btn btn-danger w-50'>Delete</button>
                </div>

            </form>
        </div>
    );
};

export default FullProfile;
