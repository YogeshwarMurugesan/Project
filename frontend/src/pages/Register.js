import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useAuth } from '../context/authcontext';
import { useNavigate } from 'react-router-dom';


import './Login.css'
import { Link } from 'react-router-dom';
import axios from 'axios';



const Register = () => {
    const { Login } = useAuth()
    const navigate = useNavigate()
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [errorMessage, setErrorMessage] = useState('')

    const handleSetName = (e) => {
        const { name, value } = e.target
        setRegisterData({
            ...registerData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3001/', registerData)
            alert('User Register Successfully ')
            Login()
            navigate('/Login')
            console.log('User Register Successfully ' + registerData)
        } catch (error) {
            console.error('Registration failed:', error);
            setErrorMessage(error.response.data)
        }
    }

    console.log(registerData)
    return (
        <div className="container loginPage">
            <div className="row">
                <div className="col col-lg-6 col-md-6 col-sm-12 leftbox ">
                    <h1>Welcome Back!</h1>
                    <p>To keep connected with us please login with your personal info</p>
                    <Link to='/Login' className="btn sign-in-btn">LOG IN</Link>


                </div>

                <div className="col col-lg-6 col-md-6 col-sm-12 rightbox">
                    <form onSubmit={handleSubmit}>
                        <h1 className='text-center heading'>Create Account</h1>
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Show error message */}

                        <div className="input-container">
                            <PersonIcon className="input-icon" />
                            <input type="text" name='name' className="form-control" placeholder="Name" value={registerData.name} onChange={handleSetName} />
                        </div>
                        <div className="input-container">
                            <EmailIcon className="input-icon" />
                            <input type="email" name='email' className="form-control" placeholder="Email" value={registerData.email} onChange={handleSetName} />
                        </div>
                        <div className="input-container">
                            <LockIcon className="input-icon" />
                            <input type="password" name='password' className="form-control" placeholder="Password" value={registerData.password} onChange={handleSetName} />
                        </div>

                        <button className="btn sign-up-btn w-100 mb-3">SIGN UP</button>
                        <p>Already have an account? <Link to="/Login" className="toggle-link" >Login</Link></p>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Register