import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/home.css'
import '../styles/modal.css'
import { Link } from 'react-router-dom'

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

  const handleLogoutClick = () => {
    setConfirmLogout(true)
  }

  const handleConfirmLogout = () => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    setConfirmLogout(false)
    navigate('/')
  }

  const handleCancelLogout = () => {
    setConfirmLogout(false)
  }

  function ModalConfirmLogout() {
    return (
      <div className='ModalBackground'>
        <div className='ModalConfirm'>
          <h3>Confirm Logout</h3>
          <p>Are you sure you want to logout?</p>
          <div id="buttonContainer">
            <button id='ConfirmButton' onClick={handleConfirmLogout}>Yes, Logout</button>
            <button id='CancelButton' onClick={handleCancelLogout}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
    <div id="makeshiftnavbar">
      <div className="homelogo">
        <div>
          <img id="logo" src="../../src/assets/spotipy.png" alt="Spoti.py Logo" />
        </div>
      </div>
        <div>
          <input type="text" placeholder="Search for songs, artists, albums..." id="searchbar" />
          {/* <img id="searchicon" src="../../src/assets/searchicon.png" alt="Search Icon" /> */}
        </div>
        <div id="profileandlogout" style={{display: "flex", alignItems: "center", gap: "15px"}}>
          <div id="profilecircle">
          <p>Logged in as <Link to={`/user/me`}>{userId?.username}</Link></p>
          </div>

        <button className='logbtn' onClick={handleLogoutClick} style={{ padding: '10px 20px', cursor: 'pointer' }}>Logout</button>
        </div>
    </div>
      {ConfirmLogout && <ModalConfirmLogout />}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className='homebody'>

      </div>
    </div>
  )
}

export default AuthUserHome
