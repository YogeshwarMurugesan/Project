import { useState } from 'react';
import './Sidebar.css';
import { sideBarData } from './SidebarData';
import { Outlet } from 'react-router-dom';

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState(window.location.pathname);

    const handleLink = (link) => {
        setActiveLink(link);
        window.location.href = link; // Navigate to the link
    };

    return (
        <>
            <div className='sidebar'>
                <ul>
                    {sideBarData.map((data, ind) => {
                        return (
                            <li key={ind}
                                id={activeLink === data.link ? "active" : ""}
                                onClick={() => handleLink(data.link)}
                            >
                                <div className='icon'>{data.icon}</div>
                                <div className='title'>{data.title}</div>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="main-content"> {/* Main content area for displaying routes */}
                <Outlet />
            </div>
        </>
    );
}

export default Sidebar;
