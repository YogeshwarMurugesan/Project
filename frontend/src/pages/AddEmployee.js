import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Import the motion component
import './AddEmployee.css';
import useForm from './hook/useForm';
import validate from './utils/validate';

const AddEmployee = () => {
  const { handleChange, values, handleSubmit, errors } = useForm(validate);
  const [active, setActive] = useState('personal');

  const handleClick = (state) => {
    setActive(state);
  };

  return (
    <>
      <h1 className='text-center mb-3 heading'>Add New Employee</h1>

      <div className="-page container showpices">
        <div className="row">
          <div className="col col-lg-4 col-md-6 col-sm-12">
            <button className='btn btn-success' id={active === 'personal' ? 'dark' : ''} onClick={() => handleClick('personal')}>
              Personal Information
            </button>
          </div>
          <div className="col col-lg-4 col-md-6 col-sm-12">
            <button className='btn btn-success' id={active === 'job' ? 'dark' : ''} onClick={() => handleClick('job')}>
              Job Information
            </button>
          </div>
          <div className="col col-lg-4 col-md-6 col-sm-12">
            <button className='btn btn-success' id={active === 'address' ? 'dark' : ''} onClick={() => handleClick('address')}>
              Address Information
            </button>
          </div>
        </div>
      </div>


      <div className='container custom-box mt-2 p-5'>
        <form className='form' onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          {active === 'personal' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className='row'>
                <h4 className='text-center heading'>Personal Information</h4>
                <div className="col col-lg-12 mt-3">
                  <label htmlFor="" className='form-label'>Photo</label>
                </div>
                <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                  <label htmlFor="" className='form-label' id='heading2'>Full Name</label>
                  <input type="text" className='form-control' placeholder='Enter The Name' name='name' onChange={handleChange} value={values.name} />
                  {errors.name && <span>{errors.name}</span>}
                </div>
                <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                  <label htmlFor="" className='form-label' id='heading2'>Employee ID</label>
                  <input type="text" className='form-control' placeholder='Enter Employee ID' name='empid' onChange={handleChange} value={values.empid} />
                  {errors.empid && <span>{errors.empid}</span>}
                </div>
                <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                  <label htmlFor="" className='form-label ' id='heading2'>Email Address</label>
                  <input type="text" className='form-control' placeholder='Enter Email Address' name='email' onChange={handleChange} value={values.email} />
                  {errors.email && <span>{errors.email}</span>}
                </div>
                <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                  <label htmlFor="" className='form-label' id='heading2'>Date of Birth</label>
                  <input type="date" className='form-control' placeholder='Enter Date of Birth' name='dob' onChange={handleChange} value={values.dob} />
                  {errors.dob && <span>{errors.dob}</span>}
                </div>
                <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                  <label htmlFor="" className='form-label' id='heading2'>Contact Number</label>
                  <input type="text" className='form-control' placeholder='Enter Contact Number' name='phNo' onChange={handleChange} value={values.phNo} />
                  {errors.phNo && <span>{errors.phNo}</span>}
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mt-3 mb-3">
                  <label htmlFor="gender" className="form-label" id='heading2'>Gender</label>
                  <select className="form-select" id="gender" name="gender" onChange={handleChange} value={values.gender}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <span>{errors.gender}</span>}
                </div>
                <div className='nbtn'>
                  <button className='btn btn-warning' type="button" onClick={() => handleClick('job')}>Next</button>
                </div>
              </div>
            </motion.div>
          )}

          {active === 'job' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className='row'>
                {/* Job Information Section */}
                <h4 className='text-center heading'>Job Details</h4>
                <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                  <label htmlFor="" className='form-label' id='heading2'>Job Title</label>
                  <input type="text" className='form-control' placeholder='Enter Job Title' name='jobTitle' onChange={handleChange} value={values.jobTitle} />
                  {errors.jobTitle && <span>{errors.jobTitle}</span>}
                </div>
                <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                  <label htmlFor="" className='form-label' id='heading2'>Department</label>
                  <input type="text" className='form-control' placeholder='Enter Department' name='department' onChange={handleChange} value={values.department} />
                  {errors.department && <span>{errors.department}</span>}
                </div>
                <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                  <label htmlFor="" className='form-label' id='heading2'>Work Location:</label>
                  <input type="text" className='form-control' placeholder='Work Location' name='workLocation' onChange={handleChange} value={values.workLocation} />
                  {errors.workLocation && <span>{errors.workLocation}</span>}
                </div>
                <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                  <label htmlFor="" className='form-label' id='heading2'>Date of Joining</label>
                  <input type="date" className='form-control' placeholder='Enter Date of Joining' name='doj' onChange={handleChange} value={values.doj} />
                  {errors.doj && <span>{errors.doj}</span>}
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mt-3 mb-3">
                  <label htmlFor="EmploymentType" className="form-label" id='heading2'>Employment Type</label>
                  <select className="form-select" id="EmploymentType" name="empType" onChange={handleChange} value={values.empType}>
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="contract">Contract</option>
                  </select>
                  {errors.empType && <span>{errors.empType}</span>}
                </div>
                <div className='nbtn'>
                  <button className='btn btn-danger me-2' type="button" onClick={() => handleClick('personal')}>Previous</button>
                  <button className='btn btn-warning' type="button" onClick={() => handleClick('address')}>Next</button>
                </div>
              </div>
            </motion.div>
          )}

          {active === 'address' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className='row'>
                <h4 className='text-center heading'>Address Details</h4>
                <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                  <label htmlFor="" className='form-label' id='heading2'>Address</label>
                  <input type="text" className='form-control' placeholder='Enter Address' name='address' onChange={handleChange} value={values.address} />
                  {errors.address && <span>{errors.address}</span>}
                </div>
                <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                  <label htmlFor="" className='form-label' id='heading2'>City</label>
                  <input type="text" className='form-control' placeholder='Enter City Name' name='city' onChange={handleChange} value={values.city} />
                  {errors.city && <span>{errors.city}</span>}
                </div>
                <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                  <label htmlFor="" className='form-label' id='heading2'>State</label>
                  <input type="text" className='form-control' placeholder='Enter State Name' name='state' onChange={handleChange} value={values.state} />
                  {errors.state && <span>{errors.state}</span>}
                </div>
                <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                  <label htmlFor="" className='form-label' id='heading2'>Zip Code</label>
                  <input type="text" className='form-control' placeholder='Enter pin Code' name='pinCode' onChange={handleChange} value={values.pinCode} />
                  {errors.pinCode && <span>{errors.pinCode}</span>}
                </div>
                <div className='nbtn'>
                  <button className='btn btn-danger me-2' type="button" onClick={() => handleClick('job')}>Previous</button>
                  <button className='btn btn-success' type="submit">Add Employee</button>
                </div>
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </>
  );
};

export default AddEmployee;
