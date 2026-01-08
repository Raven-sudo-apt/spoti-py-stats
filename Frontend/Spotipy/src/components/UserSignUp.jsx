import React, { use } from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


function UserSignUp(){
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  function handleSubmit(event) {
    useEffect(() => {
      UserSignUp();}
    , []);
    event.preventDefault();

  try {
    setLoading(true);
    const response = axios.post('http://localhost:8000/user');
    setMessage(response.data.message);
    setLoading(false);

  }
  catch (err) {
    setError(err.message);
    console.error('Error during sign up:', error);
  }
  }

 
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
            <h2>Sign Up</h2>
            <input type="text" placeholder='Username' required />
            <input type="email" placeholder='Email' required />
            <input type="password" placeholder='Password' required />
            <button onSubmit={handleSubmit} id="signupbtn" type="submit">Sign Up</button>
            <p>Already have an account? <Link to="/user/login">Log In</Link></p>
            
        </form>
    </div>
    </div>
  )
}

export default UserSignUp