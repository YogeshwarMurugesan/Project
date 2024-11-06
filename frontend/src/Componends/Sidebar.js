import { useEffect, useState } from 'react';
import './Sidebar.css';
import { sideBarData } from './SidebarData';
import { Outlet, useAsyncError } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authcontext';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';

const Sidebar = () => {
    const { user, logOut, loading } = useAuth();
    const [userName, setUserName] = useState('');
    const [userDetails, setUserDetails] = useState(null);
    const [activeLink, setActiveLink] = useState(window.location.pathname);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const [passwordValues, setPasswordValues] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/Dashboard/${user.email}`);
                if (response.data) {
                    setUserName(response.data.name);
                }

            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserName();
    }, [user]);

    const handleLink = (link) => {
        setActiveLink(link);
        navigate(link);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/Dashboard/${user.email}`);
            if (response.data) {
                setUserDetails(response.data);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleLogOut = () => {
        navigate('/')
        logOut()
    }

    if (loading) {
        return <h1>Loading....</h1>
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setPasswordValues((prevValue) => ({
            ...prevValue,
            [name]: value
        })

        )
    }
    console.log(passwordValues)

    const handleChangePassword = () => {
        axios.put(`http://localhost:3001/Dashboard/${user.email}`, passwordValues)
            .then((result) => {
                alert('Password Updated Success Fully')
            }).catch((err) => {
                console.error('Error changing password:', error);
                alert('Failed to change password');
            });
    }

    return (
        <>
            <nav className="navbar container-fluid w-100">
                <button className="toggle-button" onClick={toggleSidebar}>
                    ☰
                </button>

                <div className="nav-title">
                    <span > Welcome! {user.role === 'admin' ? user.name : userName}</span>
                    <Link onClick={handleProfile} className='navicon' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <PersonIcon />
                    </Link>
                </div>
            </nav>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">{userName}'s  Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {userDetails ? (
                                <div>
                                    <p><strong>Name:</strong> {userDetails.name}</p>
                                    <p><strong>Email:</strong> {userDetails.email}</p>
                                    <p><strong>Date of Birth:</strong> {userDetails.dob}</p>
                                    <p><strong>Role:</strong> {userDetails.jobTitle}</p>
                                    <p><strong>Working Location:</strong> {userDetails.workLocation}</p>
                                </div>
                            ) : (
                                <p>Loading user details...</p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary w-100" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger w-100" data-bs-dismiss="modal" onClick={handleLogOut} ><LogoutIcon /> LogOut</button>
                            <button type="button" className="btn btn-success w-100 navicon" data-bs-toggle="modal" data-bs-target="#changePasswordModal">Change Password</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="changePasswordModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="changePasswordLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="changePasswordLabel">Change Password</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* Add your form or content for changing the password here */}
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="currentPassword" className="form-label" >Current Password</label>
                                    <input type="password" className="form-control" id="currentPassword" name='currentPassword' value={passwordValues.currentPassword} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="newPassword" className="form-label" >New Password</label>
                                    <input type="password" className="form-control" id="newPassword" name='newPassword' value={passwordValues.newPassword} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label" >Confirm Password</label>
                                    <input type="password" className="form-control" id="confirmPassword" name='confirmPassword' value={passwordValues.confirmPassword} onChange={handleChange} />
                                </div>
                                <button type="submit" className="btn btn-primary w-100" onClick={handleChangePassword}>Submit</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary w-100" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>


            <div id='content' className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <ul>
                    {sideBarData.map((data, ind) => (
                        data.access.includes(user.role) &&
                        <li
                            key={ind}
                            id={activeLink === data.link ? "active" : ""}
                            onClick={() => handleLink(data.link)}
                        >
                            <div className='icon'>{data.icon}</div>
                            <div className='title'>{data.title}</div>
                        </li>
                    ))}

                </ul>
                <button className='btn btn-secondary w-100 p-4 mb-2' onClick={handleLogOut}><LogoutIcon /> Log Out</button>
            </div>

            <div className="main-content">
                <Outlet />
            </div>
        </>
    );
};

export default Sidebar;
