import React from 'react'
import { Link } from 'react-router-dom'

function Home() {

  return (
    <div>
        <Link to="/"><div className="homelogo" style={{display: "flex", gap: "20px", alignItems: "center"}}>
        <img id="logo" src="../../src/assets/Python-logo-notext.svg.png" alt="Spoti.py Logo" />
        <h1>Spoti.py</h1>
        </div></Link>
        <div className='homebody'>
        <p>Your ultimate music streaming experience.</p>
        <br />
        <Link to="/users/signup">Sign Up</Link>
        <br />
        <p>Or if you have an account already, <Link to="/users/login">Log In</Link></p>
        </div>
    </div>
  )
}

export default Home
