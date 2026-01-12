import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


function UserSignUp(){
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [display_name, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/user/signup', {
        "display_name": display_name,
        "email": email,
        "password": password
      });
      setMessage(response.data.message);
      setLoading(false);
      setTimeout(() => {
        navigate('/user/login');
      }, 1500);
    }
    catch (err) {
      setError(err.message);
      setLoading(false);
      console.error('Error during sign up:', err);
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
        <form className='formbody' onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <input onChange={(event) => {
              setEmail(event.target.value); setError('');}} value={email} type="email" placeholder='Email' required />
              <input onChange={(event) => {
              setPassword(event.target.value); setError('');}} value={password} type="password" placeholder='Password' required />
            <input onChange={(event) => {
              setDisplayName(event.target.value); setError('');}} value={display_name} type="text" placeholder='Username' required />
            
            <button className='logbtn' type="submit" disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            <p>Already have an account? <Link to="/user/login">Log In</Link></p>
      
            
        </form>
    </div>
    </div>
  )
}

export default UserSignUp