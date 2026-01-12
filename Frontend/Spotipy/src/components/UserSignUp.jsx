import React, { use } from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


function UserSignUp(){
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    useEffect(() => {
      UserSignUp();}
    , []);
    event.preventDefault();

  try {
    setLoading(true);
    const response = axios.post('http://localhost:8000/user/signup', {
      "username": username,
      "email": email,
      "password": password
    }
    );
    setMessage(response.data.message);
    setLoading(false);
    return "Sign up successful", message;
  }
  catch (err) {
    setError(err.message);
    console.error('Error during sign up:', error);
  }
  }

 
  return (
    <div>
    <div>
        <div className="homelogo" style={{display: "flex", gap: "20px", alignItems: "center"}}>
                <Link to="/"><img id="logo" src="../../src/assets/spotipy.png" alt="Spoti.py Logo" /></Link>
                </div>
    </div>
    <div className='formcontainer'>
        <form className='formbody'>
            <h2>Sign Up</h2>
            <input onChange={(event) => {
              setUsername(event.target.value)}}type="text" placeholder='Username' required />
            <input onChange={(event) => {
              setEmail(event.target.value)}} type="email" placeholder='Email' required />
            <input onChange={(event) => {
              setPassword(event.target.value)}} type="password" placeholder='Password' required />
            <button onSubmit={handleSubmit} className='logbtn' type="submit">Sign Up</button>
            <p>Already have an account? <Link to="/user/login">Log In</Link></p>
            
        </form>
    </div>
    </div>
  )
}

export default UserSignUp