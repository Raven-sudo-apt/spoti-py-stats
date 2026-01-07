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
    <div className='formbody'>
        <form>
            <h2>Sign Up</h2>
            <input type="text" placeholder='Username' required />
            <input type="email" placeholder='Email' required />
            <input type="password" placeholder='Password' required />
            <button id="signupbtn" type="submit">Sign Up</button>
            <p>Already have an account? <Link to="/user/login">Log In</Link></p>
            
        </form>
    </div>
    </div>
  )
}

export default UserSignUp