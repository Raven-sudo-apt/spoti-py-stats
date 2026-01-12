import axios from 'axios';
import React, {use, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

function UserLogin() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/user/login', {
        "email": email,
        "password": password,
      }, { withCredentials: true });
      setMessage(response.data.message);
      setLoading(false);
      setTimeout(() => {
      navigate('/home');}, 500);
    } catch (err) {
      setError("Invalid email or password, please try again.");
      setLoading(false);
      return <div>
        <p>{err.message}</p>
      </div>
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
                <h2>Log In</h2>
                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} placeholder='Email' required />
                <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(''); }} placeholder='Password' required />
                <button className='logbtn' type="submit" disabled={loading}>{loading ? <p>Logging in...</p> : "Log In"}</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {message && <p style={{ color: 'green' }}>{message}</p>}
                <p>Don't have an account? <Link to="/user/signup">Sign Up</Link></p>

                
            </form>
        </div>
    </div>
  )
}

export default UserLogin
