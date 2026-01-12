import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

function MyProfile() {
  const { user, loading, error, logout } = useAuth()
  
  return (
    <div>
    {loading && <p>Loading...</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <div className="homelogo" style={{display: "flex", gap: "20px", alignItems: "center"}}>
    <Link to="/"><img id="logo" src="../../src/assets/spotipy.png" alt="Spoti.py Logo" /></Link>
    </div>
    <div><h2>{user?.username}</h2></div>
    </div>
  )
}

export default MyProfile
