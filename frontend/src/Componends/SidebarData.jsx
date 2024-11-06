import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import AddIcon from '@mui/icons-material/Add';

export const sideBarData = [
    {
        title: "Dashboard",
        icon: <DashboardIcon />,
        link: "/Dashboard",
        access : ['user','admin']
    },

    {
        title: "Employees",
        icon: <PeopleAltIcon />,
        link: "/Employees",
        access : ['user','admin']
    },

    {
        title: "Apply Leave",
        icon: <TimeToLeaveIcon />,
        link: "/Profile",
        access : ['user','admin']
    },

    {
        title: "Add Empoloyee",
        icon: <AddIcon />,
        link: "/api/addEmp",
        access : ['admin']
    }    
] 