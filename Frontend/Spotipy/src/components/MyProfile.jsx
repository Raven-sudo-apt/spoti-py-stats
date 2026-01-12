import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'

function MyProfile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
      const verifyAuth = async () => {
        try {
          const response = await axios.get('http://localhost:8000/user/me', {
            withCredentials: true
          })
          setUser(response.data)
          setLoading(false)
        } catch (err) {
          setError(`${err.message} Redirecting to login...`)  
          setLoading(false)
          navigate('/user/login')

        }
      }
      console.log(user)
      verifyAuth()
    }, [navigate])
  return (
    <div>
    <div className="homelogo" style={{display: "flex", gap: "20px", alignItems: "center"}}>
    <Link to="/"><img id="logo" src="../../src/assets/spotipy.png" alt="Spoti.py Logo" /></Link>
    </div>
    <div><h2>{user?.username}</h2></div>
    </div>
  )
}

export default MyProfile
