import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import "./Employees.css"
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';


const Employees = () => {

    const [employees, setEmployee] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/Employees')
            .then((res) => {
                setEmployee(res.data)
            })
            .catch((err) => {
                console.log(err);

            })
    }, [])

    return (
        <div className='container'>
            <h1 className='text-center'>Employees Details</h1>
            <h2 className='text-center mb-5'>{employees.length} Employees</h2>
            <div className="container">
                <div className="row">
                    {employees.map((employee, index) => (
                        <div className="col col-lg-4 col-md-6 col-sm-12 mb-4">
                            <div className="card" style={{ width: 'auto' }} key={index}>
                                <div className="card-body">

                                    <div className="row">

                                        <div className="col col-lg-6 col-md-12">
                                            <h5 className="card-title">{employee.name}</h5>
                                            <h6 className="card-subtitle mb-2 text-body-secondary">{employee.jobTitle}</h6>
                                        </div>

                                        <div className="col col-lg-6 col-md-12">
                                            <Link to={`/viewProfile/${employee.email}`}>
                                                <button className='btn btn-secondary'>View Full Profile</button>
                                            </Link>
                                        </div>

                                    </div>

                                    <div className='border '>
                                        <div className="row mt-4">
                                            <div className="col col-6 ">
                                                <p className="card-text ms-3">Department: <br />{employee.department}</p>
                                            </div>

                                            <div className="col col-6">
                                                <p className="card-text">Hired Date: <br />{employee.doj}</p>
                                            </div>
                                        </div>
                                        <div className='row mt-4 email'>
                                            <Link to={`/employee/${employee.id}`} className="card-link mb-3"><span className='me-2 text-primary'><EmailIcon /></span>{employee.email}</Link><br />
                                        </div>
                                        <div>
                                            <span className='me-2 text-primary'><LocalPhoneIcon /></span>
                                            {employee.phNo}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>

    )
}

export default Employees