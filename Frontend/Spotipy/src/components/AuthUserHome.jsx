import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/home.css'


function AuthUserHome() {
  const [userId, setUserId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [ConfirmLogout, setConfirmLogout] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user/me', {
          withCredentials: true
        })
        
        setUserId(response.data)
        setLoading(false)
      } catch (err) {
        setError(`${err.message} Redirecting to login...`)  
        setLoading(false)
        
        setTimeout(() => {
          navigate('/user/login')
        }, 1500)
      }
    }

    verifyAuth()
  }, [navigate])

  const handleLogout = () => {
    function ConfirmLogout() {
      return <div id="confirmModal">
        <p>Are you sure you want to logout?</p>
        <button onClick={() => setConfirmLogout(true)}>Yes</button>
        <button onClick={() => setConfirmLogout(false)}>No</button>
      </div>
    }
    if (ConfirmLogout) {
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      navigate('/')
    }
  }

  return (
    <div>
    <div id="makeshiftnavbar">
      <div className="homelogo">
        <div>
          <img id="logo" src="../../src/assets/spotipy.png" alt="Spoti.py Logo" />
        </div>
        </div>
        <button className='logbtn' onClick={handleLogout} style={{ padding: '10px 20px', cursor: 'pointer' }}>Logout</button>
        </div>
      {loading && <p>Loading...</p>}

      <div className='homebody'>
        <h2>Welcome Back!</h2>
        <p>User ID: {userId}</p>
        <p>Stream music and connect with your friends like never before</p>
      </div>
    </div>
  )
}

export default AuthUserHome
