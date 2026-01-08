import React from 'react'
import { Link } from 'react-router-dom'

function UserLogin() {
  return (
    <div>
        <div>
        <Link to="/"><div className="homelogo" style={{display: "flex", gap: "20px", alignItems: "center"}}>
        <img id="logo" src="../../src/assets/Python-logo-notext.svg.png" alt="Spoti.py Logo" />
        <h1>Spoti.py</h1>
        </div></Link>
        </div>
        <div className='formcontainer'>
            <form className='formbody'>
                <h2>Log In</h2>
                <input type="email" placeholder='Email' required />
                <input type="password" placeholder='Password' required />
                <button id="loginbtn" type="submit">Log In</button>
                <p>Don't have an account? <Link to="/user/signup">Sign Up</Link></p>
            </form>
        </div>
    </div>
  )
}

export default UserLogin
