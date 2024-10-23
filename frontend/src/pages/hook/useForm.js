import React, { useState } from 'react';
import axios from 'axios';


const useForm = (validate) => {
    const [values, setValues] = useState({
        name: '',
        empid: '',
        email: '',
        dob: '',
        phNo: '',
        gender: 'Female',
        jobTitle: '',
        department: '',
        workLocation: '',
        doj: '',
        empType: '',
        address: '',
        city: '',
        state: '',
        pinCode: ''
    });

    const resetForm = ()=>{
        setValues({
            name: '',
        empid: '',
        email: '',
        dob: '',
        phNo: '',
        gender: 'Female',
        jobTitle: '',
        department: '',
        workLocation: '',
        doj: '',
        empType: '',
        address: '',
        city: '',
        state: '',
        pinCode: ''
        })
    }

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValue) => ({
            ...prevValue,
            [name]: value
        }));

        // Clear the error for the current field if it exists
        if (errors[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        console.log("function called");
        
        e.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        console.log(Object.values(errors));
        
        // console.log(Object.values(errors).length === 0)
        if (Object.values(errors).length === 0) {
            try {
                const response = await axios.post('http://localhost:3001/api/addEmp', values)
                console.log('Employee added:', response.data);
            } catch (error) {
                console.log('There was an error adding the employee:', error);
            }
        }
        resetForm()
    };

    return { handleChange, values, handleSubmit, errors };
};

export default useForm;
