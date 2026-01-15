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
  const Joined = user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'
  return (
    <div>
    <div>
    {loading && <p>Loading...</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <div className="homelogo" style={{display: "flex", gap: "20px", alignItems: "center"}}>
    <Link to="/"><img id="logo" src="../../src/assets/spotipy.png" alt="Spoti.py Logo" /></Link>
    </div>
    </div>

    
    <div className='profileContainer'>
    <div><h2>{user?.username}'s Profile</h2></div>
    <div><p>Joined: {Joined}</p></div>
    <div>
      {user?.profile_picture ? (
        <div>
        <div>
        <img src={user.profile_picture} alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
        </div>
        <div>
        <button className="logbtn" onClick={() => navigate('/settings')}>Settings</button>
        </div>
      </div>

      ) : (
        <div>
        <p>No profile picture available.</p>
        <button onClick={() => navigate('/settings')}>Settings</button>
        </div>
        
      )}
    </div>

    <div>
      <button className='logbtn' onClick={logout} style={{ padding: '10px 20px', cursor: 'pointer' }}>Logout</button>
    </div>
    </div>
    </div>
    
  )
}

export default MyProfile
