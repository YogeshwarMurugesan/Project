import React, { useState } from 'react';
import './AddEmployee.css';

const AddEmployee = () => {
  const [active, setActive] = useState('personal');
  const [formData, setFormData] = useState({
    fullName: '',
    employeeId: '',
    email: '',
    dob: '',
    contact: '',
    jobTitle: '',
    department: '',
    workLocation: '',
    dateOfJoining: '',
    employmentType: '',
    residentialAddress: '',
    city: '',
    state: '',
    postalCode: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    // Personal Information validation
    if (active === 'personal') {
      if (!formData.fullName) newErrors.fullName = 'Full name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email format is invalid';
      if (!formData.contact) newErrors.contact = 'Contact number is required';
      if (formData.contact && !/^\d{10}$/.test(formData.contact)) newErrors.contact = 'Enter a valid 10-digit contact number';
    }

    // Job Information validation
    if (active === 'job') {
      if (!formData.jobTitle) newErrors.jobTitle = 'Job Title is required';
      if (!formData.department) newErrors.department = 'Department is required';
      if (!formData.workLocation) newErrors.workLocation = 'Work Location is required';
      if (!formData.dateOfJoining) newErrors.dateOfJoining = 'Date of Joining is required';
    }

    // Address Information validation
    if (active === 'address') {
      if (!formData.residentialAddress) newErrors.residentialAddress = 'Residential Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.postalCode) newErrors.postalCode = 'Postal Code is required';
      if (formData.postalCode && !/^\d{6}$/.test(formData.postalCode)) newErrors.postalCode = 'Enter a valid 6-digit Postal Code';
    }

    return newErrors;
  };

  const handleNext = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      // Proceed to the next section if no errors
      if (active === 'personal') setActive('job');
      if (active === 'job') setActive('address');
    } else {
      setErrors(validationErrors);
    }
  };

  const handlePrevious = () => {
    if (active === 'job') setActive('personal');
    if (active === 'address') setActive('job');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      // Submit form if no errors
      console.log('Form Submitted Successfully', formData);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <h1 className='text-center mb-3'>Add New Employee</h1>

      <div className="container showpices">
        <ul>
          <button className='btn btn-success' id={active === 'personal' ? 'dark' : ''} onClick={() => setActive('personal')}>Personal Information</button>
        </ul>
        <ul>
          <button className='btn btn-success' id={active === 'job' ? 'dark' : ''} onClick={() => setActive('job')}>Job Information</button>
        </ul>
        <ul>
          <button className='btn btn-success' id={active === 'address' ? 'dark' : ''} onClick={() => setActive('address')}>Address Information</button>
        </ul>
      </div>

      <div className='container custom-box mt-2 p-5'>
        <form className='form' onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          {active === 'personal' && (
            <div className='row'>
              <h4 className='text-center'>Personal Information</h4>
              <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                <label className='form-label'>Full Name</label>
                <input type="text" className='form-control' name="fullName" placeholder='Enter Full Name' value={formData.fullName} onChange={handleChange} required />
                {errors.fullName && <p className="text-danger">{errors.fullName}</p>}
              </div>
              <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                <label className='form-label'>Email Address</label>
                <input type="email" className='form-control' name="email" placeholder='Enter Email Address' value={formData.email} onChange={handleChange} required />
                {errors.email && <p className="text-danger">{errors.email}</p>}
              </div>
              <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                <label className='form-label'>Contact Number</label>
                <input type="text" className='form-control' name="contact" placeholder='Enter Contact Number' value={formData.contact} onChange={handleChange} required />
                {errors.contact && <p className="text-danger">{errors.contact}</p>}
              </div>
              <div className='nbtn'>
                <button className='btn btn-warning' type="button" onClick={handleNext}>Next</button>
              </div>
            </div>
          )}

          {/* Job Information Section */}
          {active === 'job' && (
            <div className='row'>
              <h4 className='text-center'>Job Information</h4>
              <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                <label className='form-label'>Job Title</label>
                <input type="text" className='form-control' name="jobTitle" placeholder='Enter Job Title' value={formData.jobTitle} onChange={handleChange} required />
                {errors.jobTitle && <p className="text-danger">{errors.jobTitle}</p>}
              </div>
              <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                <label className='form-label'>Department</label>
                <input type="text" className='form-control' name="department" placeholder='Enter Department' value={formData.department} onChange={handleChange} required />
                {errors.department && <p className="text-danger">{errors.department}</p>}
              </div>
              <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                <label className='form-label'>Work Location</label>
                <input type="text" className='form-control' name="workLocation" placeholder='Enter Work Location' value={formData.workLocation} onChange={handleChange} required />
                {errors.workLocation && <p className="text-danger">{errors.workLocation}</p>}
              </div>
              <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                <label className='form-label'>Date of Joining</label>
                <input type="date" className='form-control' name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} required />
                {errors.dateOfJoining && <p className="text-danger">{errors.dateOfJoining}</p>}
              </div>
              <div className='nbtn'>
                <button className='btn btn-danger me-2' type="button" onClick={handlePrevious}>Previous</button>
                <button className='btn btn-warning' type="button" onClick={handleNext}>Next</button>
              </div>
            </div>
          )}

          {/* Address Information Section */}
          {active === 'address' && (
            <div className='row'>
              <h4 className='text-center'>Address Information</h4>
              <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                <label className='form-label'>Residential Address</label>
                <input type="text" className='form-control' name="residentialAddress" placeholder='Enter Residential Address' value={formData.residentialAddress} onChange={handleChange} required />
                {errors.residentialAddress && <p className="text-danger">{errors.residentialAddress}</p>}
              </div>
              <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                <label className='form-label'>City</label>
                <input type="text" className='form-control' name="city" placeholder='Enter City' value={formData.city} onChange={handleChange} required />
                {errors.city && <p className="text-danger">{errors.city}</p>}
              </div>
              <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                <label className='form-label'>State</label>
                <input type="text" className='form-control' name="state" placeholder='Enter State' value={formData.state} onChange={handleChange} required />
                {errors.state && <p className="text-danger">{errors.state}</p>}
              </div>
              <div className="col col-lg-4 col-md-6 col-sm-12 mt-3">
                <label className='form-label'>Postal Code</label>
                <input type="text" className='form-control' name="postalCode" placeholder='Enter Postal Code' value={formData.postalCode} onChange={handleChange} required />
                {errors.postalCode && <p className="text-danger">{errors.postalCode}</p>}
              </div>
              <div className='nbtn'>
                <button className='btn btn-danger me-2' type="button" onClick={handlePrevious}>Previous</button>
                <button className='btn btn-success' type="submit">Submit</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default AddEmployee;
