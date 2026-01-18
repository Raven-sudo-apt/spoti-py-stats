import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
function Settings() {
    const { makeshiftNavbar} = useAuth()
    const [ShowSettings, setShowSettings ] = useState(false)
    const [ userData, setUserData ] = useState(null)
    const [ updatedData, setUpdatedData ] = useState({})
    async function fetchUserData() {
    
    try {
        const response = await axios.get('http://localhost:8000/user/me', {
          withCredentials: true,
        })
        console.log(response.data)
        setUserData(response.data)

    }catch (error) {
        console.error(error)

    }
}
    async function updateUserData(updatedData) {
    try {
        const response = await axios.put('http://localhost:8000/user/me', updatedData, {
            withCredentials: true,
        })
        console.log(response.data)
    }
        catch (error) {
            console.error(error)
        }
    }

useEffect(() => {
    fetchUserData()
}
, [])
function SettingsModal(){
    return (
      <div className='ModalBackground'>
        <form className='ModalConfirm' onSubmit={updateUserData()}>
          <div className='Forminputsdiv'>
          <input  value={updatedData.username} type="text" placeholder='Username' />
          <input  value={updatedData.email} type="email" placeholder='Email' />
          <input  value={updatedData.profile_picture} type="text" placeholder='Profile Picture URL' />
          <div id="buttonContainer">
            <button type='submit'  id='ConfirmButton' >Save Changes</button>
            <button id='CancelButton'  onClick={() => {setShowSettings(false)}}>Close</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
  return (
    <div>
      {makeshiftNavbar()}
        <div style={{ padding: '20px' }}>
          {userData && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
              <h2>User Settings</h2>
              <p>Name: {userData.username}</p>
              <p>Email: {userData.email}</p>
              <button className='logbtn' onClick={() => {setShowSettings(true)}}>Change Settings</button>
            </div>
          )}
        </div>
        <div>
          {ShowSettings && <SettingsModal />}
        </div>
    </div>

  )
}

export default Settings
