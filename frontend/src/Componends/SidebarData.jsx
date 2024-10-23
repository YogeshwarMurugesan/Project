import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';

export const sideBarData = [
    {
        title: "Dashboard",
        icon: <DashboardIcon />,
        link: "/Dashboard"
    },

    {
        title: "Employees",
        icon: <PeopleAltIcon />,
        link: "/Employees"
    },

    {
        title: "View Profile",
        icon: <PersonIcon />,
        link: "/Profile"
    },

    {
        title: "Add Empoloyee",
        icon: <AddIcon />,
        link: "/api/addEmp"
    },

    {
        title: "Logout",
        icon: <LogoutIcon />,
        link: "/Logout"
    }
] 