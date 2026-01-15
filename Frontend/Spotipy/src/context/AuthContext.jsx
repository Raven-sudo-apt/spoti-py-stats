import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [confirmLogout, setConfirmLogout] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user/me', {
          withCredentials: true,
        })
        setError(null)
        setUser(response.data)
      } catch (err) {
        setError(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    verifyAuth()
  }, [navigate])

  const login = async (email, password) => {
    setLoading(true)
    setError(null)
    setConfirmLogout(false)
    try {
      const response = await axios.post('http://localhost:8000/user/login', {
        email,
        password,
      }, {
        withCredentials: true,
      })

      setUser(response.data.user)
      navigate('/home')
      return response.data
    } catch (err) {
      setError(err.message || 'Login failed')
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
      setError(err.message || 'Signup failed')
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
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
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
        <div style={{display: "flex", alignItems: "center", gap: "20px"}}>
        <div className="homelogo">
          <Link to='/home'>
            <img id="logo" src="../../src/assets/spotipy.png" alt="Spoti.py Logo" />
          </Link>
        </div>
        <div style={{marginTop: "10px"}}>{user && <p>Logged in as <Link target="_blank" to={`/user/me`}>{user.username}</Link></p>}</div>
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
  }

  return (
    <AuthContext.Provider
      value={{
        user,
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

