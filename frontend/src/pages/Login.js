import React, { useState } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import './Login.css'
import { Link } from 'react-router-dom';


const Login = () => {

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

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    console.log(loginData)
    return (
        <div className="container loginPage">
            <div className="row">
                <div className="col col-lg-6 col-md-6 col-sm-12 leftbox ">
                    <h1>Hello!</h1>
                    <p>To get started on this journey, create your account with us!</p>
                    <Link to='/' className="btn sign-in-btn">SIGN UP</Link>
                </div>

                <div className="col col-lg-6 col-md-6 col-sm-12 rightbox">
                    <form onSubmit={handleSubmit}>
                        <h1 className='text-center heading'>Login</h1>
                        <div className="input-container">
                            <EmailIcon className="input-icon" />
                            <input type="email" className="form-control" placeholder="Email" name='email' onChange={handleChange} value={loginData.email} />
                        </div>
                        <div className="input-container">
                            <LockIcon className="input-icon" />
                            <input type="password" className="form-control" placeholder="Password" name='password' onChange={handleChange} value={loginData.password} />
                        </div>
                        <button className="btn sign-up-btn">LOGIN</button>
                        <p className='mt-5'>Don’t have an account? <Link to='/' className="toggle-link" >Sign Up</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login