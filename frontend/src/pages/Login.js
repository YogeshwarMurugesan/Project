import React, { useState } from 'react';
import './Login.css';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import axios from 'axios'
import { useAuth } from '../context/authcontext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [isLoginView, setIsLoginView] = useState(false);
    const {user, Login} = useAuth()
    const navigate = useNavigate()

    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: ''
    })


    const toggleView = () => {
        setIsLoginView(!isLoginView);
    };

    const handleChange = (e) => {
        const { name, value } = e.target

        setRegisterData({
            ...registerData,
            [name]: value
        })
    }

    const handleRegisterSubmit =async (e)=>{
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001',registerData )
            alert('Register Successfully')
            const token = localStorage.setItem('token', JSON.stringify(registerData))
            Login()
            navigate('/Dashboard')
        } catch (error) {
            alert(error)
        }

    }

    return (
        <div className="container login-page">
            <div className="row justify-content-center align-items-center">
                <div className={`col-lg-6 col-md-8 col-sm-12 container-box ${isLoginView ? 'login-active' : ''}`}>
                    <div className="left-box">
                        {isLoginView ? (
                            <>
                                <div className="content">
                                    <h1>Hello!</h1>
                                    <p>To get started on this journey, create your account with us!</p>
                                    <button className="btn sign-in-btn" onClick={toggleView}>SIGN UP</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="content">
                                    <h1>Welcome Back!</h1>
                                    <p>To keep connected with us please login with your personal info</p>
                                    <button className="btn sign-in-btn" onClick={toggleView}>LOG IN</button>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="right-box">
                        <div className="content">
                            {isLoginView ? (
                                // Login Form
                                <>
                                    <h1>Login</h1>
                                    <div className="input-container">
                                        <EmailIcon className="input-icon" />
                                        <input type="email" className="form-control" placeholder="Email" />
                                    </div>
                                    <div className="input-container">
                                        <LockIcon className="input-icon" />
                                        <input type="password" className="form-control" placeholder="Password" />
                                    </div>
                                    <button className="btn sign-up-btn">LOGIN</button>
                                    <p>Don’t have an account? <span className="toggle-link" onClick={toggleView}>Sign Up</span></p>
                                </>
                            ) : (
                                // Sign Up Form
                                <>
                                <form action="" onSubmit={handleRegisterSubmit}>
                                    <h1>Create Account</h1>
                                    <div className="social-icons">
                                        <FacebookIcon className="social-icon" />
                                        <GoogleIcon className="social-icon" />
                                        <LinkedInIcon className="social-icon" />
                                    </div>
                                    <p>or use your email for registration:</p>
                                    <div className="input-container">
                                        <PersonIcon className="input-icon" />
                                        <input type="text" name='name' className="form-control" placeholder="Name" value={registerData.name} onChange={handleChange} />
                                    </div>
                                    <div className="input-container">
                                        <EmailIcon className="input-icon" />
                                        <input type="email" name='email' className="form-control" placeholder="Email" value={registerData.email }  onChange={handleChange}/>
                                    </div>
                                    <div className="input-container">
                                        <LockIcon className="input-icon" />
                                        <input type="password" name='password' className="form-control" placeholder="Password" value={registerData.password } onChange= {handleChange} />
                                    </div>
                                    <button className="btn sign-up-btn">SIGN UP</button>
                                    <p>Already have an account? <span className="toggle-link" onClick={toggleView}>Login</span></p>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
