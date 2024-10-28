import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null)

export const Auth = ({ children }) => {

    useEffect(() => {
        Login()
    },
        [])
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    const Login = () => {
        const token = localStorage.getItem('token')
        setUser(JSON.parse(token))
        // setTimeout(() => {
        //     setLoading(false)
        // }, 1000)
        setLoading(false)
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