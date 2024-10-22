import React, { useState } from 'react';
import './AddEmployee.css';

const AddEmployee = () => {
  const [active, setActive] = useState('personal');

  const handleClick = (state) => {
    setActive(state);
  };

  return (
    <>
      <h1 className='text-center mb-3'>Add New Employee</h1>

      <div className="container showpices">
        <ul>
          <button className='btn btn-success' id={active === 'personal' ? 'dark' : ''} onClick={() => handleClick('personal')}>Personal Information</button>
        </ul>
        <ul>
          <button className='btn btn-success' id={active === 'job' ? 'dark' : ''} onClick={() => handleClick('job')}>Job Information</button>
        </ul>
        <ul>
          <button className='btn btn-success' id={active === 'address' ? 'dark' : ''} onClick={() => handleClick('address')}>Address Information</button>
        </ul>
      </div>

      <div className='container custom-box mt-2 p-5'>
        <form className='form'>
          {/* Personal Information Section */}
          {active === 'personal' ? (
            <div className='row'>
              <h4 className='text-center'>Personal Information</h4>
              <div className="col col-lg-12 mt-3">
                <label htmlFor="" className='form-label'>Photo</label>
              </div>
              <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                <label htmlFor="" className='form-label'>Full Name</label>
                <input type="text" className='form-control' placeholder='Enter The Name ' required />
              </div>
              <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                <label htmlFor="" className='form-label'>Employee ID</label>
                <input type="text" className='form-control' placeholder='Enter Employee ID' />
              </div>
              <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                <label htmlFor="" className='form-label'>Email Address</label>
                <input type="text" className='form-control' placeholder='Enter Email Address' />
              </div>
              <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                <label htmlFor="" className='form-label'>Date of Birth</label>
                <input type="date" className='form-control' placeholder='Enter Date of Birth' />
              </div>
              <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                <label htmlFor="" className='form-label'>Contact Number</label>
                <input type="text" className='form-control' placeholder='Enter Contact Number' />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 mt-3 mb-3">
                <label htmlFor="gender" className="form-label">Gender</label>
                <select className="form-select" id="gender" name="gender">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className='nbtn'>
                <button className='btn btn-warning' type="button" onClick={() => handleClick('job')}>Next</button>
              </div>
            </div>
          ) : active === 'job' ? (
            <div className='row'>
              {/* Job Information Section */}
              <h4 className='text-center'>Job Details</h4>
              <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                <label htmlFor="" className='form-label'>Job Title</label>
                <input type="text" className='form-control' placeholder='Enter Job Title ' />
              </div>
              <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                <label htmlFor="" className='form-label'>Department</label>
                <input type="text" className='form-control' placeholder='Enter Department' />
              </div>
              <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                <label htmlFor="" className='form-label'>Work Location:</label>
                <input type="text" className='form-control' placeholder='Work Location' />
              </div>
              <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                <label htmlFor="" className='form-label'>Date of Joining</label>
                <input type="date" className='form-control' placeholder='Enter Date of Joining' />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 mt-3 mb-3">
                <label htmlFor="EmploymentType" className="form-label">Employment Type</label>
                <select className="form-select" id="EmploymentType" name="EmploymentType">
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                  <option value="contract">Contract</option>
                </select>
              </div>
              <div className='nbtn'>
                <button className='btn btn-danger me-2' type="button" onClick={() => handleClick('personal')}>Previous</button>
                <button className='btn btn-warning' type="button" onClick={() => handleClick('address')}>Next</button>
              </div>
            </div>
          ) : active === 'address' ? (
            <div className='row'>

              {/* Address Information Section */}
              <h4 className='text-center'>Address Information</h4>
              <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                <label htmlFor="" className='form-label'>Residential Address</label>
                <input type="text" className='form-control' placeholder='Enter Residential Address' />
              </div>
              <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                <label htmlFor="" className='form-label'>City </label>
                <input type="text" className='form-control' placeholder='Enter City Name' />
              </div>
              <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                <label htmlFor="" className='form-label'>State</label>
                <input type="text" className='form-control' placeholder='Enter State Name' />
              </div>
              <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                <label htmlFor="" className='form-label'>Postal Code</label>
                <input type="text" className='form-control' placeholder='Enter Postal Code' />
              </div>
              <div className='nbtn'>
               <button className='btn btn-danger me-2' type="button" onClick={() => handleClick('job')}>Previous</button>
                <button className='btn btn-success me-2' type="button">Save</button>
                <button className='btn btn-warning' type="button">Reset</button>
              </div>
            </div>
          ) : null}
        </form>
      </div>
    </>
  );
};

export default AddEmployee;
