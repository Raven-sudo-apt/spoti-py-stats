import { React, useEffect, useState } from 'react'
import axios from 'axios'


export default function displayArists() {
    async function fetchArtists() {
        try {
            const response = await axios.get('http://localhost:8000/artists/');
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching artists:', error);
        }
    }
    useEffect(() => {
        fetchArtists();
    }, []);
  return (
    <div>
        <p style={{fontSize: "24px", fontWeight: "bold"}}>Artists</p>
        <div style={{display: "flex"}}>
            <ul>
                <li>Artist 1</li>
                <li>Artist 2</li>
            </ul>
        </div>
            
    </div>
  )
}
