import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import ClientAxios from '../config/ClientAxios'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const authUser = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                setLoading(false)
                return
            } 
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await ClientAxios('/users/perfil', config)
                setAuth(data)
                navigate('/proyectos')
            } catch (error) {
                console.log(error)
                setAuth({})
            } finally {
                setLoading(false)
            }
        }
        authUser()
    }, [])
    
    const signOutProject = () => {
        setAuth({})
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                signOutProject
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext