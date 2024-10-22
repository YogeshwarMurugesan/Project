import React from 'react'

const Employees = () => {
  return (
    <div>
        <h1>Employees Details</h1>
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Sr.No</th>
                    <th>Emp. Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Department</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>1</td>
                    <td>S6428</td>
                    <td>Yoogesh</td>
                    <td>Yogesh@gmail</td>
                    <td>9094109595</td>
                    <td>IT</td>
                    <td>
                        <button className='btn btn-success me-2'>Update</button>
                        <button className='btn btn-danger'>Delete</button>
                    </td>
                </tr>


                <tr>
                    <td>1</td>
                    <td>S6428</td>
                    <td>Yoogesh</td>
                    <td>Yogesh@gmail</td>
                    <td>9094109595</td>
                    <td>IT</td>
                    <td>
                        <button className='btn btn-success me-2'>Update</button>
                        <button className='btn btn-danger'>Delete</button>
                    </td>
                </tr>

                <tr>
                    <td>1</td>
                    <td>S6428</td>
                    <td>Yoogesh</td>
                    <td>Yogesh@gmail</td>
                    <td>9094109595</td>
                    <td>IT</td>
                    <td>
                        <button className='btn btn-success me-2'>Update</button>
                        <button className='btn btn-danger'>Delete</button>
                    </td>
                </tr>


                <tr>
                    <td>1</td>
                    <td>S6428</td>
                    <td>Yoogesh</td>
                    <td>Yogesh@gmail</td>
                    <td>9094109595</td>
                    <td>IT</td>
                    <td>
                        <button className='btn btn-success me-2'>Update</button>
                        <button className='btn btn-danger'>Delete</button>
                    </td>
                </tr>


                <tr>
                    <td>1</td>
                    <td>S6428</td>
                    <td>Yoogesh</td>
                    <td>Yogesh@gmail</td>
                    <td>9094109595</td>
                    <td>IT</td>
                    <td>
                        <button className='btn btn-success me-2'>Update</button>
                        <button className='btn btn-danger'>Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default Employees