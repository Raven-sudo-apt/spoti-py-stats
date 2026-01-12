import axios from 'axios'
import { Link } from 'react-router-dom';
import React from 'react';

function Tracks() {
    async function fetchTracks() {
        <div className="homelogo" style={{display: "flex", gap: "20px", alignItems: "center"}}>
        <Link to="/"><img id="logo" src="../../src/assets/spotipy.png" alt="Spoti.py Logo" /></Link>
        </div>
        try {
            const response = await axios.get('http://localhost:8000/tracks', {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching tracks:', error);
            throw error;
        }
    }
    fetchTracks();
  return (
    <div>
      <h2>Tracks</h2>
    </div>
  )
}

export default Tracks
