import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

function MyProfile() {
  const { user, loading, error, logout, navigate } = useAuth()
  if (user) {
    document.title = `Spoti.py - ${user.username}'s Profile`
  }
  return (
    <div>
    <div>
    {loading && <p>Loading...</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <div className="homelogo" style={{display: "flex", gap: "20px", alignItems: "center"}}>
    <Link to="/"><img id="logo" src="../../src/assets/spotipy.png" alt="Spoti.py Logo" /></Link>
    </div>

    
    </div>
    <div><h2>{user?.username}'s Profile</h2></div>
    <div><p>Joined: {user?.created_at}</p></div>
    </div>
  )
}

export default MyProfile
