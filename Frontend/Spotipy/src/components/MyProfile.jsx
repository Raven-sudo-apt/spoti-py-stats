// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx'


function MyProfile() {
  const { user, loading, error, logout, navigate, makeshiftNavbar } = useAuth()
  if (user) {
    document.title = `Spoti.py - ${user.username}'s Profile`
  }
  const Joined = user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'
  return (
    <div>
    <div>
    {makeshiftNavbar()}
    {loading && <p>Loading...</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}
    
    </div>
    <div className='profileContainer' style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "100%", marginTop: "50px"}}>
    <div><h2>{user?.username}'s Profile</h2></div>
    <div><p>Joined: {Joined}</p></div>
    <div>
      {user?.profile_picture ? (
        <div>
        <div>
        <img src={user.profile_picture} alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
        </div>
        <div>
        <button className="logbtn" onClick={() => navigate('user/settings')}>Settings</button>
        </div>
      </div>

      ) : (
        <div>
        <p>No profile picture available.</p>
        <button className="logbtn" onClick={() => navigate('user/settings')}>Settings</button>
        </div>
        
      )}
    </div>
    </div>
    </div>
    
  )
}

export default MyProfile
