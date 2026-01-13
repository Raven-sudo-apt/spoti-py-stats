import axios from 'axios'
import { Link } from 'react-router-dom';
import React from 'react';

function Tracks() {
    async function addTracks() {

      return (

        <div className='ModalBackground'>
          <div className='addNewTrack'>
          <h2>Add New Track</h2>
          <form>
            <label>Track Name:</label>
            <input type="text" name="trackName" required />
            <label>Artist:</label>
            <input type="text" name="artist" required />
            <label>Album:</label>
            <input type="text" name="album" required />
            <label>Genre:</label>
            <input type="text" name="genre" required />
            <label>Release Date:</label>
            <input type="date" name="releaseDate" required />
            <button type="submit">Add Track</button>
          </form>
          </div>
        </div>
      )
    }
  }
    //     <div className="homelogo" style={{display: "flex", gap: "20px", alignItems: "center"}}>
    //     <Link to="/"><img id="logo" src="../../src/assets/spotipy.png" alt="Spoti.py Logo" /></Link>
    //     </div>
    //     try {
    //         const response = await axios.get('http://localhost:8000/tracks', {
    //             withCredentials: true
    //         });
    //         return response.data;
    //     } catch (error) {
    //         console.error('Error fetching tracks:', error);
    //         throw error;
    //     }
    // }
    // fetchTracks();


export default Tracks
