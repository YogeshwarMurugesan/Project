import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './FullProfile.css'

const FullProfile = () => {
    const { email } = useParams();
    const [employee, setEmployee] = useState(null);
    const [isEditable, setIsisEditable] = useState(false)


    // View Employee
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


    // while edit the filed it save old fields 
    const handleChange = (e) => {
        console.log(e.target.value)
        console.log(e.target.name)

        const { name, value } = e.target

        setEmployee((prevEmp) => ({
            ...prevEmp,
            [name]: value
        })
        )

    }


    // it decide when form is editabele or not
    const handleEdit = () => {
        setIsisEditable(!isEditable)
    }

    //Put the updated data in db
    const handleSave = () => {
        axios.put(`http://localhost:3001/viewProfile/${email}`, employee)
            .then((result) => {
                console.log('User Updated Successfully')
                setIsisEditable(false)
            }).catch((err) => {
                console.log(err)
            });
    }

    return (
        <div className="container">

            <h1>{employee.name}'s Profile</h1>

            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{isEditable ? (
                            <input
                                type="text"
                                name='name'
                                value={employee.name}
                                onChange={handleChange}
                                className="form-control"
                            />
                        ) :
                            (employee.name)}</td>
                    </tr>

                    <tr>
                        <td>Employee Id</td>
                        <td>{isEditable ? (
                            <input
                                type="text"
                                name='empid'
                                value={employee.empid}
                                onChange={handleChange}
                                className="form-control"
                            />
                        ) :
                            (employee.empid)}</td>
                    </tr>

                    <tr>
                        <td>Email</td>
                        <td>{isEditable ? (
                            <input
                                type="text"
                                name='email'
                                value={employee.email}
                                onChange={handleChange}
                                className="form-control"
                            />
                        ) :
                            (employee.email)}</td>
                    </tr>

                    <tr>
                        <td>Date of Birth</td>
                        <td>{isEditable ? (
                            <input
                                type="date"
                                name='dob'
                                value={employee.dob}
                                onChange={handleChange}
                                className="form-control"
                            />
                        ) :
                            (employee.dob)}</td>
                    </tr>

                    <tr>
                        <td>Phone Number</td>
                        <td>{isEditable ? (
                            <input
                                type="text"
                                name='phNo'
                                value={employee.phNo}
                                onChange={handleChange}
                                className="form-control"
                            />
                        ) :
                            (employee.phNo)}</td>
                    </tr>

                    <tr>
                        <td>Gender</td>
                        <td>
                            {isEditable ? (
                                <select
                                    name='gender'
                                    value={employee.gender}
                                    onChange={handleChange}
                                    className="form-control"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            ) : (
                                employee.gender
                            )}
                        </td>
                    </tr>

                    <tr>
                        <td>Job Title</td>
                        <td>{isEditable ? (
                            <input
                                type="text"
                                name='jobTitle'
                                value={employee.jobTitle}
                                onChange={handleChange}
                                className="form-control"
                            />
                        ) :
                            (employee.jobTitle)}</td>
                    </tr>

                    <tr>
                        <td>Department</td>
                        <td>{isEditable ? (
                            <input
                                type="text"
                                name='department'
                                value={employee.department}
                                onChange={handleChange}
                                className="form-control"
                            />
                        ) :
                            (employee.department)}</td>
                    </tr>

                    <tr>
                        <td>Work Location</td>
                        <td>{isEditable ? (
                            <input
                                type="text"
                                name='workLocation'
                                value={employee.workLocation}
                                onChange={handleChange}
                                className="form-control"
                            />
                        ) :
                            (employee.workLocation)}</td>
                    </tr>

                    <tr>
                        <td>Date of Joining</td>
                        <td>{isEditable ? (
                            <input
                                type="date"
                                name='doj'
                                value={employee.doj}
                                onChange={handleChange}
                                className="form-control"
                            />
                        ) :
                            (employee.doj)}</td>
                    </tr>

                    <tr>
                        <td>Employee Type</td>
                        <td>
                            {isEditable ? (
                                <select
                                    name='empType'
                                    value={employee.empType}
                                    onChange={handleChange}
                                    className="form-control"
                                >
                                    <option value="Full-Time">Full-Time</option>
                                    <option value="Part-Time">Part-Time</option>
                                    <option value="Contract">Contract</option>
                                </select>
                            ) : (
                                employee.empType
                            )}
                        </td>
                    </tr>

                    <tr>
                        <td>Address</td>
                        <td>{isEditable ? (
                            <input
                                type="text"
                                name='address'
                                value={employee.address}
                                onChange={handleChange}
                                className="form-control"
                            />
                        ) :
                            (employee.address)}</td>
                    </tr>

                    <tr>
                        <td>City</td>
                        <td>{isEditable ? (
                            <input
                                type="text"
                                name='city'
                                value={employee.city}
                                onChange={handleChange}
                                className="form-control"
                            />
                        ) :
                            (employee.city)}</td>
                    </tr>

                    <tr>
                        <td>State</td>
                        <td>{isEditable ? (
                            <input
                                type="text"
                                name='state'
                                value={employee.state}
                                onChange={handleChange}
                                className="form-control"
                            />
                        ) :
                            (employee.state)}</td>
                    </tr>

                    <tr>
                        <td>Pincode</td>
                        <td>{isEditable ? (
                            <input
                                type="text"
                                name='pinCode'
                                value={employee.pinCode}
                                onChange={handleChange}
                                className="form-control"
                            />
                        ) :
                            (employee.pinCode)}</td>
                    </tr>


                </tbody>
            </table>

            <div className='mt-3'>
                <button
                    type='button'
                    className='btn btn-success me-1'
                    onClick={isEditable ? handleSave : handleEdit}
                >
                    {isEditable ? 'Save' : 'Edit'}

                </button>
                <button
                    type='button'
                    className='btn btn-danger'
                >
                    Delete
                </button>
            </div>

        </div>
    );
};

export default FullProfile;
