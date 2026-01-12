import React from 'react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function displayPlaylist() {


    const navigate = useNavigate()
    const [userId, setUserId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
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
            navigate('/user/login')
            
          }
        }
    
        verifyAuth()
      }, [navigate])
  return (
    <div>
      
    </div>
  )
}


export default displayPlaylist
