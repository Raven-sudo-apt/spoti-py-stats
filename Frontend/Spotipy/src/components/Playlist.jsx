import React from 'react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function displayPlaylists() {


    const { user, loading, error, logout, navigate } = useAuth()

  return (
    <div>
        
    </div>
  )
}


export default displayPlaylists
