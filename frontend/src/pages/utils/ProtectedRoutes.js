import React from 'react'
import { useAuth } from '../../context/authcontext';
import { Navigate } from 'react-router-dom';


const ProtectedRoutes = ({ children, allowedRoutes }) => {
    const { user, loading } = useAuth()

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (!user) {
        return <Navigate to={'/Login'} />
    }

    if(!allowedRoutes.includes(user.role)){
        return <h1 className='heading'>Please contact admin!</h1>
    }

    return children
}

export default ProtectedRoutes