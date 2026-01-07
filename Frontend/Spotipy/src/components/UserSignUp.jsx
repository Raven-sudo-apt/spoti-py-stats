import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

    
function UserSignUp(){


 
  return (
    <div>
    <div>
        <Link to="/"><div className="homelogo" style={{display: "flex", gap: "20px", alignItems: "center"}}>
        <img id="logo" src="../../src/assets/Python-logo-notext.svg.png" alt="Spoti.py Logo" />
        <h1>Spoti.py</h1>
        </div></Link>
    </div>
    <div>

    </div>
    </div>
  )
}

export default UserSignUp