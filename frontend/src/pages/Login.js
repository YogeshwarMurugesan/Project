import React, { useState } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import './Login.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/authcontext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const { Login , logOut} = useAuth()
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3001/Login', loginData)
            localStorage.setItem('token', response.config.data)
            Login()
            navigate('/Dashboard')
        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    console.log(loginData)
    return (
        <div className="container loginPage">
            <div className="row">
                <div className="col col-lg-6 col-md-6 col-sm-12 leftbox ">
                    <h1 className='color-light'>Hello!</h1>
                    <p>To get started on this journey, create your account with us!</p>
                    <Link to='/' className="btn sign-in-btn">SIGN UP</Link>
                </div>

                <div className="col col-lg-6 col-md-6 col-sm-12 rightbox">
                    <form onSubmit={handleSubmit}>
                        <h1 className='text-center heading '>Login</h1>
                        <div className="input-container">
                            <EmailIcon className="input-icon" />
                            <input type="email" className="form-control" placeholder="Email" name='email' onChange={handleChange} value={loginData.email} />
                        </div>
                        <div className="input-container">
                            <LockIcon className="input-icon" />
                            <input type="password" className="form-control" placeholder="Password" name='password' onChange={handleChange} value={loginData.password} />
                        </div>
                        <button className="btn sign-up-btn w-100">LOGIN</button>
                        <p className='mt-5'>Don’t have an account? <Link to='/' className="toggle-link" >Sign Up</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login