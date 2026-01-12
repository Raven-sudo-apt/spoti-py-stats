import React from 'react'
import axios from 'axios'

function Tracks() {
    async function fetchTracks() {
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
