import React, {createContext, useContext, useEffect, useState} from 'react'
import axios from 'axios'

const AuthContext = createContext()


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
    const verifyAuth = async () => {
    try{
    const response = axios.get('http://localhost:8000/user/me', {
        withCredentials: true
      })
      setUser(response.data)
        setLoading(false)
    } catch (err) {
        setError(`${err.message} Redirecting to login...`)  
        setLoading(false)
        setUser(null)
      }
    }
    verifyAuth()
    }, [])

    const logout = () => {
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        setUser(null)
    }
  return (
    <AuthContext.Provider value={{ user, loading, error, logout }}>
        {children}
    </AuthContext.Provider>
  )
}
export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

