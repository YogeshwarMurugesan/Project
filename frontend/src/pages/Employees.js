import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Employees = () => {

    const [employees, setEmployee] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:3001/Employees')
        .then((res)=>{
            setEmployee(res.data)
        })
        .catch((err)=>{
            console.log(err);
            
        })
    },[])

  return (
    <div className='container'>
        <h1 className='text-center'>Employees Details</h1>
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Sr.No</th>
                    <th>Emp. Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Work Location</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {employees.map((employee, index)=>(
                    <tr key={index}>
                    <td>{index+1}</td>
                    <td>{employee.empid}</td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.jobTitle}</td>
                    <td>{employee.department}</td>
                    <td>{employee.workLocation}</td>
                    <td>
                        <button className='btn btn-success me-2'>Update</button>
                        <button className='btn btn-danger'>Delete</button>
                    </td>
                </tr>
                ))}
                
            </tbody>
        </table>
    </div>
  )
}

export default Employees