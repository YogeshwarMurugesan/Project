import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import AddIcon from '@mui/icons-material/Add';

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
        title: "Apply Leave",
        icon: <TimeToLeaveIcon />,
        link: "/Profile"
    },

    {
        title: "Add Empoloyee",
        icon: <AddIcon />,
        link: "/api/addEmp"
    }    
] 