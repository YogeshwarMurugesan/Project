import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


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
        <div classNameName='container'>
            <h1 classNameName='text-center'>Employees Details</h1>
            <h2 className='text-center mb-5'>{employees.length} Employees</h2>
            <div className="container">
                <div className="row">
                    {employees.map((employee, index) => (
                        <div className="col col-lg-3 col-md-6 col-sm-12 mb-4">
                            <div className="card" style={{ width: '20rem' }} key={index}>
                                <div className="card-body">
                                    <h5 className="card-title">{employee.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">{employee.jobTitle}</h6>
                                    <div className="row mt-4">
                                        <div className="col col-6 ">
                                            <p className="card-text">Department: <br />{employee.department}</p>
                                        </div>

                                        <div className="col col-6">
                                            <p className="card-text">Hired Date: <br />{employee.doj}</p>
                                        </div>
                                    </div>
                                    <div className="row my-3">
                                        <div className="col col-6">
                                            <Link to={`/employee/${employee.id}`} className="card-link">{employee.email}</Link>

                                        </div>
                                        <div className="col col-6">
                                            <Link to={`/employee/${employee.id}`} className="card-link">{employee.phNo}</Link>

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