import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/home.css'
function Home() {

  return (
    <div>
        <Link to="/"><div className="homelogo" style={{display: "flex", gap: "20px", alignItems: "center"}}>
        <img id="logo" src="../../src/assets/Python-logo-notext.svg.png" alt="Spoti.py Logo" />
        <h1>Spoti.py</h1>
        </div></Link>
        <p>Your ultimate music streaming experience.</p>
        <br />
        <div className='homebody'>
        <img id='homeimage' src="../../src/assets/headphones.jpg" alt="Girl with Headphones" />
        <p>Stream music and connect with your friends like never before</p>
        <p>New here?</p><Link to="/user/signup"><div id='signupbtn'>Sign Up</div></Link>
        <p>Or if you have an account already,</p> <Link to="/user/login"><div id='loginbtn'>Log In</div></Link><p/>
        </div>
    </div>
  )
}

export default Home
