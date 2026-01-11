import React from 'react'
import { Link } from 'react-router-dom'

function notFound() {
  return (

    <div>
        <div className="goHome" style={{display: "flex", gap: "20px", alignItems: "center"}}>
        <img id="logo" src="../../src/assets/spotipy.png" alt="Spoti.py Logo" />
        <h2>Oopssss...</h2>
        <h1>Page Not Found</h1>
        <Link to="/">Go Home</Link>
        </div>
    </div>
  )
}


export default notFound