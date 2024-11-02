import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

import './Login.css'
import { Link } from 'react-router-dom';


const Register = () => {
    return (
        <div className="container loginPage">
            <div className="row">
                <div className="col col-lg-6 col-md-6 col-sm-12 leftbox ">
                    <h1>Welcome Back!</h1>
                    <p>To keep connected with us please login with your personal info</p>
                    <Link to='/Login' className="btn sign-in-btn">LOG IN</Link>


                </div>

                <div className="col col-lg-6 col-md-6 col-sm-12 rightbox">
                    <form action="" >
                        <h1 className='text-center heading'>Create Account</h1>
                        
                        <div className="input-container">
                            <PersonIcon className="input-icon" />
                            <input type="text" name='name' className="form-control" placeholder="Name" />
                        </div>
                        <div className="input-container">
                            <EmailIcon className="input-icon" />
                            <input type="email" name='email' className="form-control" placeholder="Email" />
                        </div>
                        <div className="input-container">
                            <LockIcon className="input-icon" />
                            <input type="password" name='password' className="form-control" placeholder="Password" />
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