import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext(null)

export const Auth = ({ children }) => {

    useEffect(() => {
        Login()
    },
        [])
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null);

    const Login = () => {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                const decode = jwtDecode(token)
                setUser(decode)
                setLoading(false)
            } catch (error) {
                console.log('No token found')
            }
        }

    }

    const logOut = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    return <AuthContext.Provider value={{ user, Login, logOut, loading }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}