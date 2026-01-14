import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [confirmLogout, setConfirmLogout] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const verifyAuth = async () => {
      if (!token) {
        setUser(null)
        setLoading(false)
        return
      }

      try {
        const response = await axios.get('http://localhost:8000/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setError(null)
        setUser(response.data)
      } catch (err) {
        setError(`${err.message} Redirecting to login...`)
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        navigate('/user/login')
      } finally {
        setLoading(false)
      }
    }

    verifyAuth()
  }, [navigate, token])

  const login = async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.post('http://localhost:8000/user/login', {
        email,
        password,
      })

      const receivedToken = response.data.token
      if (receivedToken) {
        localStorage.setItem('token', receivedToken)
        setToken(receivedToken)
      }
      setUser(response.data.user)
      navigate('/home')
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signup = async (payload) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.post('http://localhost:8000/user/signup', payload)
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setConfirmLogout(true)
  }

  const cancelLogout = () => {
    setConfirmLogout(false)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    navigate('/')
  }

  function ModalConfirmLogout() {
    return (
      <div className='ModalBackground'>
        <div className='ModalConfirm'>
          <h3>Confirm Logout</h3>
          <p>Are you sure you want to logout?</p>
          <div id="buttonContainer">
            <button id='ConfirmButton' onClick={logout}>Yes, Logout</button>
            <button id='CancelButton' onClick={cancelLogout}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }

  function makeshiftNavbar() {
    return (
      <div id="makeshiftnavbar">
        <div className="homelogo">
          <div>
            <img id="logo" src="../../src/assets/spotipy.png" alt="Spoti.py Logo" />
          </div>
        </div>
        <div>
          <input type="text" placeholder="Search for songs, artists, albums..." id="searchbar" />
        </div>
        <div title={user ? user.username : ''} id="profilesection">
          {loadProfilePicture()}

          <button className='logbtn' onClick={handleLogout} style={{ padding: '10px 20px', cursor: 'pointer' }}>Logout</button>
        </div>
        {confirmLogout && <ModalConfirmLogout />}
      </div>
    )
  }

  function loadProfilePicture() {
    if (user && user.profile_picture) {
      return (
        <button id="profilepicbtn" onClick={() => navigate('/user/me')}>
          <img id="profilepic" src={user.profile_picture} alt={user.username} />
        </button>
      )
    }
    return <div>{user && <p>Logged in as <Link to={`/user/me`}>{user.username}</Link></p>}</div>
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        navigate,
        login,
        signup,
        logout,
        confirmLogout,
        makeshiftNavbar,
        ModalConfirmLogout,
        handleLogout,
        loadProfilePicture,
      }}
    >
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

