import React, { useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/home.css'
import axios from 'axios';

function Home() {
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [loading, setLoading] = useState(true);
const navigate = useNavigate();
  const checkAuth = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user/me', {
        withCredentials: true,
      });
      setIsAuthenticated(true);
      setLoading(false);
      navigate('/home');
    } catch (err) {
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
      
  return (
    <div>
        <div className='makeshiftnavbar'>
          <div className="homelogo">
          <div>
            <img id="logo" src="../../src/assets/spotipy.png" alt="Spoti.py Logo" />
          </div>
        </div>
        </div>
        <p>Your ultimate music streaming experience.</p>
        <br />
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        {/* <img id='homeimage' src="../../src/assets/headphones.jpg" alt="Girl with Headphones" /> */}
        <p>Stream music and connect with your friends like never before</p>
        <p>New here?</p><Link to="/user/signup"><div className='logbtn'>Sign Up</div></Link>
        <p>Or if you have an account already,</p> <Link to="/user/login"><div className='logbtn'>Log In</div></Link><p/>
        </div>
    </div>
  )
}

export default Home
