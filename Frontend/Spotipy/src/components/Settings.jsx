import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

function SettingsModal({ updatedData, onChange, onSubmit, onClose }) {
  return (
    <div className='ModalBackground'>
      <form className='ModalConfirm' onSubmit={onSubmit}>
        <div className='Forminputsdiv'>
          <input
            value={updatedData.username}
            onChange={(e) => onChange({ ...updatedData, username: e.target.value })}
            type="text"
            placeholder='Username'
          />
          <input
            value={updatedData.email}
            onChange={(e) => onChange({ ...updatedData, email: e.target.value })}
            type="email"
            placeholder='Email'
          />
          <input
            value={updatedData.profile_picture}
            onChange={(e) => onChange({ ...updatedData, profile_picture: e.target.value })}
            type="text"
            placeholder='Profile Picture URL'
          />
          <div id="buttonContainer">
            <button type='submit' onClick={() => console.log("Save Changes clicked")} id='ConfirmButton'>Save Changes</button>
            <button type='button' id='CancelButton' onClick={onClose}>Close</button>
          </div>
        </div>
      </form>
    </div>
  )
}

function Settings() {
  const { makeshiftNavbar } = useAuth()
  const [showSettings, setShowSettings] = useState(false)
  const [userData, setUserData] = useState(null)
  const [updatedData, setUpdatedData] = useState({
    username: '',
    email: '',
    profile_picture: '',
  })

  async function fetchUserData() {
    try {
      const response = await axios.get('http://localhost:8000/user/me', {
        withCredentials: true,
      })
      setUserData(response.data)
      setUpdatedData({
        username: response.data.username || '',
        email: response.data.email || '',
        profile_picture: response.data.profile_picture || '',
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function updateUserData(event) {
    event.preventDefault()
    try {
      const response = await axios.put('http://localhost:8000/user/me', updatedData, {
        withCredentials: true,
      })
      setUserData(response.data)
      updateUserContext(response.data)
      setShowSettings(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <div>
      {makeshiftNavbar()}
      <div style={{ padding: '20px' }}>
        {userData && (
          <div className="profileContainer">
            <h2>User Settings</h2>  
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
            <img src={userData.profile_picture} alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%', boxShadow: '2px 4px 8px rgba(0, 185, 114, 0.64)' }} />
            <button className='logbtn' onClick={() => { setShowSettings(true) }}>Change Settings</button>
          </div>
        )}
      </div>
      <div>
        {showSettings && (
          <SettingsModal
            updatedData={updatedData}
            onChange={setUpdatedData}
            onSubmit={updateUserData}
            onClose={() => setShowSettings(false)}
          />
        )}
      </div>
    </div>
  )
}

export default Settings
